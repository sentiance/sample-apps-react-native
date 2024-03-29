package com.sampleappsreactnative;

import android.app.Application;
import android.content.Context;
import android.util.Log;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.PackageList;
import com.facebook.soloader.SoLoader;
import com.sentiance.react.bridge.core.SentianceHelper;
import com.sentiance.sdk.init.InitializationResult;

import java.lang.reflect.InvocationTargetException;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

    private static final String TAG = "MainApplication";

    private final ReactNativeHost mReactNativeHost =
            new ReactNativeHost(this) {
                @Override
                public boolean getUseDeveloperSupport() {
                    return BuildConfig.DEBUG;
                }

                @Override
                protected List<ReactPackage> getPackages() {
                    @SuppressWarnings("UnnecessaryLocalVariable")
                    List<ReactPackage> packages = new PackageList(this).getPackages();
                    // Packages that cannot be autolinked yet can be added manually here, for example:
                    // packages.add(new MyReactNativePackage());
                    return packages;
                }

                @Override
                protected String getJSMainModuleName() {
                    return "index";
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
        initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
        initializeSentianceSDK();
    }

    private void initializeSentianceSDK() {
        InitializationResult initializationResult = SentianceHelper.getInstance(getApplicationContext()).initializeSDK();
        if (!initializationResult.isSuccessful()) {
            Log.e(TAG, "Failed to initialize Sentiance SDK. Error: " + initializationResult.getFailureReason().name());
        } else {
            Log.i(TAG, "Sentiance SDK initialized successfully.");
        }
    }

    /**
     * Loads Flipper in React Native templates. Call this in the onCreate method with something like
     * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
     *
     * @param context
     * @param reactInstanceManager
     */
    private static void initializeFlipper(Context context, ReactInstanceManager reactInstanceManager) {
        if (BuildConfig.DEBUG) {
            try {
                // We use reflection here to pick up the class that initializes Flipper,
                // since Flipper library is not available in release mode
                Class<?> aClass = Class.forName("com.sampleappsreactnative.ReactNativeFlipper");
                aClass.getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
                        .invoke(null, context, reactInstanceManager);
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            } catch (NoSuchMethodException e) {
                e.printStackTrace();
            } catch (IllegalAccessException e) {
                e.printStackTrace();
            } catch (InvocationTargetException e) {
                e.printStackTrace();
            }
        }
    }
}
