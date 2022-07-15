// Copyright 2016-present 650 Industries. All rights reserved.

#import <UIKit/UIKit.h>
#import "ABI46_0_0EXScopedBridgeModule.h"
#import "ABI46_0_0EXScopedModuleRegistry.h"

@interface ABI46_0_0EXUtil : ABI46_0_0EXScopedBridgeModule

+ (nullable NSString *)escapedResourceName:(nullable NSString *)name;
+ (void)performSynchronouslyOnMainThread:(nonnull void (^)(void))block;
+ (nonnull NSString *)hexStringWithCGColor:(nullable CGColorRef)color;
+ (nonnull UIColor *)colorWithRGB:(unsigned int)rgbValue;

/**
 *  Expects @"#ABCDEF"
 */
+ (nullable UIColor *)colorWithHexString:(nullable NSString *)hexString;

- (nullable UIViewController *)currentViewController;

@end

@protocol ABI46_0_0EXUtilService

- (nullable UIViewController *)currentViewController;
- (nullable NSDictionary *)launchOptions;

@end

ABI46_0_0EX_DECLARE_SCOPED_MODULE_GETTER(ABI46_0_0EXUtil, util)
