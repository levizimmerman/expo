// Copyright © 2021-present 650 Industries, Inc. (aka Expo)

#include "JavaScriptObject.h"
#include "JavaScriptValue.h"
#include "JavaScriptRuntime.h"
#include "JSITypeConverter.h"

namespace expo {
void JavaScriptObject::registerNatives() {
  registerHybrid({
                   makeNativeMethod("hasProperty", JavaScriptObject::jniHasProperty),
                   makeNativeMethod("getProperty", JavaScriptObject::jniGetProperty),
                   makeNativeMethod("getPropertyNames", JavaScriptObject::jniGetPropertyNames),
                   makeNativeMethod("setBoolProperty", JavaScriptObject::setProperty<bool>),
                   makeNativeMethod("setDoubleProperty", JavaScriptObject::setProperty<double>),
                   makeNativeMethod("setStringProperty",
                                    JavaScriptObject::setProperty<jni::alias_ref<jstring>>),
                   makeNativeMethod("setJSValueProperty",
                                    JavaScriptObject::setProperty<jni::alias_ref<JavaScriptValue::javaobject>>),
                   makeNativeMethod("setJSObjectProperty",
                                    JavaScriptObject::setProperty<jni::alias_ref<JavaScriptObject::javaobject>>),
                   makeNativeMethod("unsetProperty", JavaScriptObject::unsetProperty),
                 });
}

JavaScriptObject::JavaScriptObject(
  std::weak_ptr<JavaScriptRuntime> runtime,
  std::shared_ptr<jsi::Object> jsObject
) : runtimeHolder(std::move(runtime)), jsObject(std::move(jsObject)) {
  assert(runtimeHolder.lock() != nullptr);
}

std::shared_ptr<jsi::Object> JavaScriptObject::get() {
  return jsObject;
}

bool JavaScriptObject::hasProperty(const std::string &name) {
  auto runtime = runtimeHolder.lock();
  assert(runtime != nullptr);
  return jsObject->hasProperty(*runtime->get(), name.c_str());
}

jsi::Value JavaScriptObject::getProperty(const std::string &name) {
  auto runtime = runtimeHolder.lock();
  assert(runtime != nullptr);
  return jsObject->getProperty(*runtime->get(), name.c_str());
}

bool JavaScriptObject::jniHasProperty(jni::alias_ref<jstring> name) {
  return hasProperty(name->toStdString());
}

jni::local_ref<JavaScriptValue::javaobject> JavaScriptObject::jniGetProperty(
  jni::alias_ref<jstring> name
) {
  auto result = std::make_shared<jsi::Value>(getProperty(name->toStdString()));
  return JavaScriptValue::newObjectCxxArgs(runtimeHolder, result);
}

std::vector<std::string> JavaScriptObject::getPropertyNames() {
  auto runtime = runtimeHolder.lock();
  assert(runtime != nullptr);

  jsi::Array properties = jsObject->getPropertyNames(*runtime->get());
  auto size = properties.size(*runtime->get());

  std::vector<std::string> names(size);
  for (size_t i = 0; i < size; i++) {
    auto propertyName = properties
      .getValueAtIndex(*runtime->get(), i)
      .asString(*runtime->get())
      .utf8(*runtime->get());
    names[i] = propertyName;
  }

  return names;
}

jni::local_ref<jni::JArrayClass<jstring>> JavaScriptObject::jniGetPropertyNames() {
  std::vector<std::string> cResult = getPropertyNames();
  auto paredResult = jni::JArrayClass<jstring>::newArray(cResult.size());
  for (size_t i = 0; i < cResult.size(); i++) {
    paredResult->setElement(i, jni::make_jstring(cResult[i]).get());
  }

  return paredResult;
}

void JavaScriptObject::setProperty(const std::string &name, jsi::Value value) {
  auto runtime = runtimeHolder.lock();
  assert(runtime != nullptr);
  jsObject->setProperty(*runtime->get(), name.c_str(), value);
}

void JavaScriptObject::unsetProperty(jni::alias_ref<jstring> name) {
  auto runtime = runtimeHolder.lock();
  assert(runtime != nullptr);
  auto cName = name->toStdString();
  jsObject->setProperty(
    *runtime->get(),
    cName.c_str(),
    jsi::Value::undefined()
  );
}
} // namespace expo
