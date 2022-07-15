// Copyright 2018-present 650 Industries. All rights reserved.

#if __has_include(<ABI46_0_0EXErrorRecovery/ABI46_0_0EXErrorRecoveryModule.h>)
#import <ABI46_0_0EXErrorRecovery/ABI46_0_0EXErrorRecoveryModule.h>

@interface ABI46_0_0EXScopedErrorRecoveryModule : ABI46_0_0EXErrorRecoveryModule

- (instancetype)initWithScopeKey:(NSString *)scopeKey;

@end

#endif
