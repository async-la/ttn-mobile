package com.async.ttn;

import android.app.Application;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.util.Log;

import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactApplication;
import com.imagepicker.ImagePickerPackage;
import com.microsoft.codepush.react.CodePush;
import com.horcrux.svg.SvgPackage;
import io.sentry.RNSentryPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {

      Bundle metaData = new Bundle();
      try {
        ApplicationInfo ai = getPackageManager().getApplicationInfo(getPackageName(), PackageManager.GET_META_DATA);
        metaData = ai.metaData;
      } catch (PackageManager.NameNotFoundException e) {
        Log.e("ReactNative", "Failed to load meta-data, NameNotFound: " + e.getMessage());
      } catch (NullPointerException e) {
        Log.e("ReactNative", "Failed to load meta-data, NullPointer: " + e.getMessage());
      }

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new ImagePickerPackage(),
          new CodePush(metaData.getString("com.async.ttn.codePushKey"), getApplicationContext(), BuildConfig.DEBUG),
          new SvgPackage(),
          new RNSentryPackage(),
          new TTNMQTTPackage(),
          new VectorIconsPackage(),
          new MapsPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
