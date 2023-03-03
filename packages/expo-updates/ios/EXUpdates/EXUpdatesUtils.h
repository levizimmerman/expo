//  Copyright © 2019 650 Industries. All rights reserved.

#import <React/RCTBridge.h>

@class EXUpdatesConfig;
@class EXUpdatesAsset;

NS_ASSUME_NONNULL_BEGIN

@interface EXUpdatesUtils : NSObject

+ (void)runBlockOnMainThread:(void (^)(void))block;
+ (NSString *)hexEncodedSHA256WithData:(NSData *)data;
+ (NSString *)base64UrlEncodedSHA256WithData:(NSData *)data;
+ (nullable NSURL *)initializeUpdatesDirectoryWithError:(NSError ** _Nullable)error;
+ (void)sendEventToBridge:(nullable RCTBridge *)bridge withType:(NSString *)eventType body:(NSDictionary *)body;
+ (BOOL)shouldCheckForUpdateWithConfig:(EXUpdatesConfig *)config;
+ (NSString *)getRuntimeVersionWithConfig:(EXUpdatesConfig *)config;
+ (nullable NSURL *)urlForBundledAsset:(EXUpdatesAsset *)asset;
+ (nullable NSString *)pathForBundledAsset:(EXUpdatesAsset *)asset;
+ (BOOL)isNativeDebuggingEnabled;
+ (void)purgeUpdatesLogsOlderThanOneDay;

@end

NS_ASSUME_NONNULL_END
