// Copyright 2015-present 650 Industries. All rights reserved.

#import <ABI45_0_0EXConstants/ABI45_0_0EXConstants.h>
#import <ABI45_0_0ExpoModulesCore/ABI45_0_0EXConstantsInterface.h>

#import <WebKit/WKWebView.h>

@interface ABI45_0_0EXConstants () {
  WKWebView *webView;
}

@property (nonatomic, strong) NSString *webViewUserAgent;
@property (nonatomic, weak) id<ABI45_0_0EXConstantsInterface> constantsService;

@end

@implementation ABI45_0_0EXConstants

ABI45_0_0EX_REGISTER_MODULE();

+ (const NSString *)exportedModuleName
{
  return @"ExponentConstants";
}

- (void)setModuleRegistry:(ABI45_0_0EXModuleRegistry *)moduleRegistry
{
  _constantsService = [moduleRegistry getModuleImplementingProtocol:@protocol(ABI45_0_0EXConstantsInterface)];
}

- (NSDictionary *)constantsToExport
{
  return [_constantsService constants];
}

ABI45_0_0EX_EXPORT_METHOD_AS(getWebViewUserAgentAsync,
                    getWebViewUserAgentWithResolver:(ABI45_0_0EXPromiseResolveBlock)resolve
                    rejecter:(ABI45_0_0EXPromiseRejectBlock)reject)
{
  __weak ABI45_0_0EXConstants *weakSelf = self;
  dispatch_async(dispatch_get_main_queue(), ^{
    __strong ABI45_0_0EXConstants *strongSelf = weakSelf;
    if (strongSelf) {
      if (!strongSelf.webViewUserAgent) {
        // We need to retain the webview because it runs an async task.
        strongSelf->webView = [[WKWebView alloc] init];

        [strongSelf->webView evaluateJavaScript:@"window.navigator.userAgent;" completionHandler:^(id _Nullable result, NSError * _Nullable error) {
          if (error) {
            reject(@"ERR_CONSTANTS", error.localizedDescription, error);
            return;
          }
          
          strongSelf.webViewUserAgent = [NSString stringWithFormat:@"%@", result];
          resolve(ABI45_0_0EXNullIfNil(strongSelf.webViewUserAgent));
          // Destroy the webview now that it's task is complete.
          strongSelf->webView = nil;
        }];
      } else {
        resolve(ABI45_0_0EXNullIfNil(strongSelf.webViewUserAgent));
      }
    }
  });
}

@end
