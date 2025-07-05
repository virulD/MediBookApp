package com.medibookapp

import com.facebook.react.ReactInstanceManager

/**
 * Class responsible for loading Flipper inside your React Native application. This is the release
 * flavor of this class.
 */
object ReactNativeFlipper {
  fun initializeFlipper(context: android.content.Context, reactInstanceManager: ReactInstanceManager) {
    // Do nothing as Flipper is not available in release.
  }
} 