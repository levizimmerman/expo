/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "ABI48_0_0RCTSurfaceBackedComponentState.h"

@implementation ABI48_0_0RCTSurfaceBackedComponentState

+ (instancetype)newWithSurface:(id<ABI48_0_0RCTSurfaceProtocol>)surface
{
  return [[self alloc] initWithSurface:surface];
}

- (instancetype)initWithSurface:(id<ABI48_0_0RCTSurfaceProtocol>)surface
{
  if (self = [super init]) {
    _surface = surface;
  }

  return self;
}

@end
