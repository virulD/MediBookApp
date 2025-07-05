package com.medibookapp

import android.content.Context
import com.facebook.flipper.android.AndroidFlipperClient
import com.facebook.flipper.android.utils.FlipperUtils
import com.facebook.flipper.core.FlipperClient
import com.facebook.flipper.plugins.crashreporter.CrashReporterPlugin
import com.facebook.flipper.plugins.databases.DatabasesFlipperPlugin
import com.facebook.flipper.plugins.fresco.FrescoFlipperPlugin
import com.facebook.flipper.plugins.inspector.DescriptorMapping
import com.facebook.flipper.plugins.inspector.InspectorFlipperPlugin
import com.facebook.flipper.plugins.network.FlipperOkhttpInterceptor
import com.facebook.flipper.plugins.network.NetworkFlipperPlugin
import com.facebook.flipper.plugins.sharedpreferences.SharedPreferencesFlipperPlugin
import com.facebook.react.ReactInstanceEventListener
import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.ReactContext
import com.facebook.react.modules.network.NetworkingModule
import okhttp3.OkHttpClient

/**
 * Class responsible for loading Flipper inside your React Native application. This is the debug
 * flavor of this class.
 */
object ReactNativeFlipper {
  fun initializeFlipper(context: Context, reactInstanceManager: ReactInstanceManager) {
    if (!FlipperUtils.shouldEnableFlipper(context)) {
      return
    }

    val client = AndroidFlipperClient.getInstance(context)

    client.addPlugin(InspectorFlipperPlugin(context, DescriptorMapping.withDefaults()))
    client.addPlugin(DatabasesFlipperPlugin(context))
    client.addPlugin(SharedPreferencesFlipperPlugin(context))
    client.addPlugin(CrashReporterPlugin.getInstance())

    NetworkFlipperPlugin.setUp(
      OkHttpClient.Builder()
        .addNetworkInterceptor(FlipperOkhttpInterceptor(NetworkFlipperPlugin.getInstance()))
        .build()
    )
    client.addPlugin(NetworkFlipperPlugin.getInstance())
    client.start()

    // Fresco Plugin needs to ensure that ImagePipelineFactory is initialized
    // Hence we run if after all native modules have been initialized
    val reactContextEventListener = object : ReactInstanceEventListener {
      override fun onReactContextInitialized(reactContext: ReactContext) {
        client.addPlugin(FrescoFlipperPlugin())
      }
    }
    reactInstanceManager.addReactInstanceEventListener(reactContextEventListener)
  }
} 