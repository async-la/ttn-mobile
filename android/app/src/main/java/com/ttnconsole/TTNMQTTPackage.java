package com.async.ttn;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class TTNMQTTPackage implements ReactPackage {

  @Override
  public List<NativeModule> createNativeModules(
          ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<NativeModule>();

    modules.add(new TTNMQTTModule(reactContext));

    return modules;
  }

  @Override
  public List<Class<? extends JavaScriptModule>> createJSModules() {
    return Collections.emptyList();
  }

  @Override
  public List<ViewManager> createViewManagers(
          ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

}