import Foundation

@objc(ABI49_0_0AutoLayoutViewManager)
class AutoLayoutViewManager: ABI49_0_0RCTViewManager {
    override func view() -> UIView! {
        return AutoLayoutView()
    }
    
    override static func requiresMainQueueSetup() -> Bool {
        return true
    }
}
