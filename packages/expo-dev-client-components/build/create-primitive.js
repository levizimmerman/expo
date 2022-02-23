import * as React from 'react';
import { Appearance, AccessibilityInfo, StyleSheet, Dimensions, } from 'react-native';
import { ThemePreferences } from './ThemeProvider';
const selectorStore = createSelectorStore();
export function create(component, config) {
    const styleFn = getStylesFn(config);
    config.selectors = config.selectors || {};
    const Component = React.forwardRef((props, ref) => {
        const style = styleFn(props);
        const selectorStyle = useSelectors(config.selectors, props);
        return React.createElement(component, {
            ...props,
            ...config.props,
            style: StyleSheet.flatten([
                style,
                // @ts-ignore
                props.style || {},
                selectorStyle,
            ]),
            ref,
        });
    });
    return Component;
}
export function getStylesFn(options) {
    let styles = options.base || {};
    function handleVariantProps(props) {
        options.variants = options.variants || {};
        styles = options.base;
        for (const key in props) {
            if (options.variants[key]) {
                const value = props[key];
                const styleValue = options.variants[key][value];
                if (styleValue) {
                    styles = StyleSheet.flatten(StyleSheet.compose(styles, styleValue));
                }
            }
        }
        return styles;
    }
    return handleVariantProps;
}
function createSelectorStore() {
    const activeSelectorMap = {};
    const dimensionMap = {};
    let listeners = [];
    const currentPreference = ThemePreferences.getPreference();
    let currentColorScheme = Appearance.getColorScheme();
    if (currentPreference !== 'no-preference') {
        currentColorScheme = currentPreference;
    }
    if (currentColorScheme != null) {
        if (currentColorScheme === 'light') {
            activeSelectorMap['light'] = true;
            activeSelectorMap['dark'] = false;
        }
        else if (currentColorScheme === 'dark') {
            activeSelectorMap['light'] = false;
            activeSelectorMap['dark'] = true;
        }
        notify(['light', 'dark']);
    }
    Appearance.addChangeListener(({ colorScheme }) => {
        const currentPreference = ThemePreferences.getPreference();
        if (currentPreference === 'no-preference') {
            if (colorScheme === 'light') {
                activeSelectorMap['light'] = true;
                activeSelectorMap['dark'] = false;
            }
            else if (colorScheme === 'dark') {
                activeSelectorMap['light'] = false;
                activeSelectorMap['dark'] = true;
            }
            else {
                delete activeSelectorMap['light'];
                delete activeSelectorMap['dark'];
            }
            notify(['light', 'dark']);
        }
    });
    ThemePreferences.addChangeListener((currentPreference) => {
        if (currentPreference === 'light') {
            activeSelectorMap['light'] = true;
            activeSelectorMap['dark'] = false;
        }
        else if (currentPreference === 'dark') {
            activeSelectorMap['light'] = false;
            activeSelectorMap['dark'] = true;
        }
        else {
            const currentColorScheme = Appearance.getColorScheme();
            if (currentColorScheme != null) {
                if (currentColorScheme === 'light') {
                    activeSelectorMap['light'] = true;
                    activeSelectorMap['dark'] = false;
                }
                else if (currentColorScheme === 'dark') {
                    activeSelectorMap['light'] = false;
                    activeSelectorMap['dark'] = true;
                }
                else {
                    delete activeSelectorMap['light'];
                    delete activeSelectorMap['dark'];
                }
            }
        }
        notify(['light', 'dark']);
    });
    const a11yTraits = [
        'boldTextChanged',
        'grayscaleChanged',
        'invertColorsChanged',
        'reduceMotionChanged',
        'reduceTransparencyChanged',
        'screenReaderChanged',
    ];
    a11yTraits.forEach((trait) => {
        AccessibilityInfo.addEventListener(trait, (isActive) => {
            activeSelectorMap[trait] = isActive;
            notify([trait]);
        });
    });
    async function getInitialValues() {
        const [isBoldTextEnabled, isGrayscaleEnabled, isInvertColorsEnabled, isReduceMotionEnabled, isReduceTransparencyEnabled, isScreenReaderEnabled,] = await Promise.all([
            AccessibilityInfo.isBoldTextEnabled(),
            AccessibilityInfo.isGrayscaleEnabled(),
            AccessibilityInfo.isInvertColorsEnabled(),
            AccessibilityInfo.isReduceMotionEnabled(),
            AccessibilityInfo.isReduceTransparencyEnabled(),
            AccessibilityInfo.isScreenReaderEnabled(),
        ]);
        activeSelectorMap['boldText'] = isBoldTextEnabled;
        activeSelectorMap['grayScale'] = isGrayscaleEnabled;
        activeSelectorMap['invertColors'] = isInvertColorsEnabled;
        activeSelectorMap['reduceMotion'] = isReduceMotionEnabled;
        activeSelectorMap['reduceTransparency'] = isReduceTransparencyEnabled;
        activeSelectorMap['screenReader'] = isScreenReaderEnabled;
        notify(a11yTraits);
    }
    getInitialValues();
    const { width: initialWidth, height: initialHeight } = Dimensions.get('screen');
    dimensionMap['width'] = initialWidth;
    dimensionMap['height'] = initialHeight;
    Dimensions.addEventListener('change', ({ screen }) => {
        dimensionMap['width'] = screen.width;
        dimensionMap['height'] = screen.height;
        notify(['width', 'height']);
    });
    function subscribe(fn) {
        listeners.push(fn);
        notify([]);
        return () => {
            listeners = listeners.filter((l) => l !== fn);
        };
    }
    function getState() {
        return {
            ...activeSelectorMap,
            ...dimensionMap,
        };
    }
    function notify(keys) {
        const state = getState();
        listeners.forEach((listener) => listener(keys, state));
    }
    return {
        subscribe,
    };
}
function useSelectors(selectors, props) {
    const isMounted = React.useRef(false);
    React.useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    const [activeVariants, setActiveVariants] = React.useState({});
    React.useEffect(() => {
        const unsubscribe = selectorStore.subscribe((keys, state) => {
            const variants = {};
            Object.entries(state).forEach(([selectorKey, selectorValue]) => {
                if (selectorValue !== false) {
                    if (selectorKey === 'width' || selectorKey === 'height') {
                        const queries = selectors[selectorKey];
                        for (const mediaQuery in queries) {
                            const expression = `${selectorValue} ${mediaQuery}`;
                            try {
                                // eslint-disable-next-line
                                if (eval(expression)) {
                                    mergeDeep(variants, queries[mediaQuery]);
                                }
                            }
                            catch (error) {
                                console.warn(`Did not pass in a valid query selector '${expression}' -> try a key with a valid expression like '> {number}'`);
                            }
                        }
                    }
                    else {
                        mergeDeep(variants, selectors[selectorKey]);
                    }
                }
            });
            if (isMounted.current) {
                setActiveVariants(variants);
            }
        });
        return () => unsubscribe();
    }, [selectors]);
    const activeStyles = {};
    if (activeVariants['base']) {
        mergeDeep(activeStyles, activeVariants['base']);
    }
    Object.entries(props).forEach(([variantKey, variantValue]) => {
        if (activeVariants[variantKey] && activeVariants[variantKey][variantValue]) {
            mergeDeep(activeStyles, activeVariants[variantKey][variantValue]);
        }
    });
    return activeStyles;
}
function mergeDeep(target, source) {
    const isObject = (obj) => obj && typeof obj === 'object';
    if (!isObject(target) || !isObject(source)) {
        return source;
    }
    Object.keys(source).forEach((key) => {
        const targetValue = target[key];
        const sourceValue = source[key];
        if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
            target[key] = targetValue.concat(sourceValue);
        }
        else if (isObject(targetValue) && isObject(sourceValue)) {
            target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue);
        }
        else {
            target[key] = sourceValue;
        }
    });
    return target;
}
//# sourceMappingURL=create-primitive.js.map