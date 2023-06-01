// Copyright 2015-present 650 Industries. All rights reserved.

package versioned.host.exp.exponent

import com.facebook.react.ReactInstanceManager
import com.facebook.react.bridge.Inspector
import com.facebook.react.devsupport.DevServerHelper
import com.facebook.react.devsupport.DevSupportManagerBase
import com.facebook.react.devsupport.InspectorPackagerConnection
import expo.modules.kotlin.networks.ExpoRequestCdpLogger
import expo.modules.manifests.core.Manifest
import java.io.Closeable

@Suppress("unused")
class ExpoNetworkInterceptor : Closeable, ExpoRequestCdpLogger.Delegate {
  private var isStarted = false
  private val inspectorPackagerConnection = InspectorPackagerConnectionWrapper()
  private var reactInstanceManager: ReactInstanceManager? = null

  fun start(manifest: Manifest, reactInstanceManager: ReactInstanceManager) {
    val buildProps = (manifest?.getPluginProperties("expo-build-properties")?.get("android") as? Map<*, *>)
      ?.mapKeys { it.key.toString() }
    val enableNetworkInspector = buildProps?.get("unstable_networkInspector") as? Boolean ?: false
    isStarted = enableNetworkInspector

    this.onResume(reactInstanceManager)
  }

  fun onResume(reactInstanceManager: ReactInstanceManager) {
    if (!isStarted) {
      return
    }
    this.reactInstanceManager = reactInstanceManager
    ExpoRequestCdpLogger.setDelegate(this)
  }

  fun onPause() {
    if (!isStarted) {
      return
    }
    ExpoRequestCdpLogger.setDelegate(null)
    this.reactInstanceManager = null
  }

  override fun close() {
    this.onPause()
  }

  override fun dispatch(event: String) {
    reactInstanceManager?.let {
      inspectorPackagerConnection.sendWrappedEventToAllPages(it, event)
    }
  }
}

/**
 * A `InspectorPackagerConnection` wrapper to expose private members with reflection
 */
internal class InspectorPackagerConnectionWrapper {
  private val devServerHelperField = DevSupportManagerBase::class.java.getDeclaredField("mDevServerHelper")
  private val inspectorPackagerConnectionField = DevServerHelper::class.java.getDeclaredField("mInspectorPackagerConnection")
  private val sendWrappedEventMethod = InspectorPackagerConnection::class.java.getDeclaredMethod("sendWrappedEvent", String::class.java, String::class.java)

  init {
    devServerHelperField.isAccessible = true
    inspectorPackagerConnectionField.isAccessible = true
    sendWrappedEventMethod.isAccessible = true
  }

  fun sendWrappedEventToAllPages(reactInstanceManager: ReactInstanceManager, event: String) {
    val devServerHelper = devServerHelperField[reactInstanceManager.devSupportManager]
    val inspectorPackagerConnection = inspectorPackagerConnectionField[devServerHelper] as? InspectorPackagerConnection
    for (page in Inspector.getPages()) {
      if (!page.title.contains("Reanimated")) {
        sendWrappedEventMethod.invoke(inspectorPackagerConnection, page.id.toString(), event)
      }
    }
  }
}
