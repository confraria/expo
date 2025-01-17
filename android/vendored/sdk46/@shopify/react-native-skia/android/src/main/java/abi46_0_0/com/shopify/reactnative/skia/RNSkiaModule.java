// RnskiaModule.java

package abi46_0_0.com.shopify.reactnative.skia;

import android.util.Log;

import abi46_0_0.com.facebook.react.bridge.LifecycleEventListener;
import abi46_0_0.com.facebook.react.bridge.ReactApplicationContext;
import abi46_0_0.com.facebook.react.bridge.ReactContextBaseJavaModule;
import abi46_0_0.com.facebook.react.bridge.ReactMethod;
import abi46_0_0.com.facebook.react.module.annotations.ReactModule;

import java.lang.ref.WeakReference;

@ReactModule(name="RNSkia")
public class RNSkiaModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    public static final String NAME = "RNSkia";

    private final WeakReference<ReactApplicationContext> weakReactContext;
    private SkiaManager skiaManager;

    public RNSkiaModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.weakReactContext = new WeakReference<>(reactContext);
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public void invalidate() {
        super.invalidate();

        if (getReactApplicationContext() != null) {
            getReactApplicationContext().removeLifecycleEventListener(this);
        }

        if (this.skiaManager != null) {
            this.skiaManager.invalidate();
            this.skiaManager.destroy();
            this.skiaManager = null;
        }
    }

    @Override
    public String getName() {
        return NAME;
    }

    public SkiaManager getSkiaManager() {
        return skiaManager;
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public boolean install() {
        if (skiaManager != null) {
            // Already initialized, ignore call.
            return true;
        }

        try {
            System.loadLibrary("reactskia_abi46_0_0");
            ReactApplicationContext context = weakReactContext.get();
            if (context == null) {
                Log.e(NAME, "React Application Context was null!");
                return false;
            }
            skiaManager = new SkiaManager(context);
            return true;
        } catch (Exception exception) {
            Log.e(NAME, "Failed to initialize Skia Manager!", exception);
            return false;
        }
    }

    @Override
    public void onHostResume() {
        if(skiaManager != null) skiaManager.onHostResume();
    }

    @Override
    public void onHostPause() {
        if(skiaManager != null) skiaManager.onHostPause();
    }

    @Override
    public void onHostDestroy() {

    }
}
