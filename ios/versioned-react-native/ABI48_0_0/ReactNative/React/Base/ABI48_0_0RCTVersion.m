/**
 * @generated by scripts/set-rn-version.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI48_0_0RCTVersion.h"

NSString* const ABI48_0_0RCTVersionMajor = @"major";
NSString* const ABI48_0_0RCTVersionMinor = @"minor";
NSString* const ABI48_0_0RCTVersionPatch = @"patch";
NSString* const ABI48_0_0RCTVersionPrerelease = @"prerelease";


NSDictionary* ABI48_0_0RCTGetreactNativeVersion(void)
{
  static NSDictionary* __rnVersion;
  static dispatch_once_t onceToken;
  dispatch_once(&onceToken, ^(void){
    __rnVersion = @{
                  ABI48_0_0RCTVersionMajor: @(0),
                  ABI48_0_0RCTVersionMinor: @(71),
                  ABI48_0_0RCTVersionPatch: @(7),
                  ABI48_0_0RCTVersionPrerelease: [NSNull null],
                  };
  });
  return __rnVersion;
}
