---
title: App Store Best Practices
sidebar_title: Best Practices
---

import { Collapsible } from '~/ui/components/Collapsible';
import { ConfigClassic } from '~/components/plugins/ConfigSection';
import { BoxLink } from '~/ui/components/BoxLink';

This guide offers best practices for submitting your app to the app stores. To learn how to generate native binaries for submission, refer to ["Creating your first build"](/build/setup/).

> **Disclaimer:** Review guidelines and rules are updated frequently, and enforcement of various rules can sometimes be inconsistent. There is no guarantee that your particular project will be accepted by either platform, and you are ultimately responsible for your app's behavior. That said, you can re-submit your app as needed to address feedback from reviews.

<BoxLink title="Versioning your app" description="Learn how to configure native runtime versions for your apps." href="/build-reference/app-versions" />
<BoxLink title="App Store presence" description="Manage your Apple App Store metadata from the command line." href="/eas-metadata/introduction" />
<BoxLink title="Permissions" description="Refine native permissions and system dialog messages." href="/guides/permissions" />
<BoxLink title="App icons" description="App stores have strict rules for home screen icons." href="/guides/app-icons" />
<BoxLink title="Splash screen" description="Create a seamless loading experience using with the splash screen API." href="/guides/splash-screens" />
<BoxLink title="Status bar" description="Configure the native status bar to have high contrast on all screens." href="/guides/configuring-statusbar" />
<BoxLink title="Apple: Review guidelines" description="Official Apple guide on preparing your app for App Store review." href="https://developer.apple.com/app-store/review" />

## Responsive design

It's a good idea to test your app on a device or simulator with a small screen (for example, an iPhone SE) and a large screen (for example, an iPhone X). Ensure your components render the way you expect, no buttons are blocked, and all text fields are accessible.

Try your app on tablets in addition to handsets. Even if you have `ios.supportsTablet: false` configured, your app will still render at phone resolution on iPads and must be usable.

> Apple may reject your app if elements don't render properly on an iPad, even if your app doesn't target the iPad form factor. Be sure and test your app on an iPad (or iPad simulator).

## Privacy Policy

- Starting October 3, 2018, all new iOS apps and app updates will be required to have a privacy policy in order to pass the App Store Review Guidelines.
- Additionally, a number of developers have reported warnings from Google if their app does not have a privacy policy, since by default all apps built with the classic build service contain code for requesting the Android Advertising ID. Though this code may not be executed depending on which native APIs you use, we still recommend that all apps on the Google Play Store include a privacy policy as well.

### App privacy questions

Beginning December 8, 2020, new app submissions and updates are required to provide information about their privacy practices in App Store Connect. See [App privacy details on the App Store](https://developer.apple.com/app-store/app-privacy-details/) for more information.

Apple will ask you a series of questions when you submit the app. Depending on which libraries you use, your answers may vary. For example, if you use `expo-updates`, you will need to say **Yes, we collect data from this app** and then you will want to select **Crash Data**.

<ConfigClassic>

- Select **Yes, we collect data from this app**. Click **Next**.
- Select **Device ID**
  - Managed standalone apps using the Classic Build system include the Facebook, Facebook Ads, and Google AdMob SDKs, which still access the IDFA.
- If you use `expo-facebook`, select **Other Usage Data**
- If you use `expo-updates`, select **Crash Data**
  - Errors that occur when launching an update are collected when a new update is requested.
- If you use Facebook Ads and/or Google AdMob SDKs, select **Advertising Data**

> **Note**: Supplement the above guidance with additional disclosures based on the data your particular app and the third-party services you use collect.

</ConfigClassic>

## Localizing your iOS app

If you plan on shipping your app to different countries, or regions, or want it to support various languages, you can provide [localized](/versions/latest/sdk/localization) strings for things like the display name and system dialogs. All of this is easily set up [in your `app.json`](/workflow/configuration) file. First, set `ios.infoPlist.CFBundleAllowMixedLocalizations: true`, then provide a list of file paths to `locales`.

```json app.json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "CFBundleAllowMixedLocalizations": true
      }
    },
    "locales": {
      "ja": "./languages/japanese.json"
    }
  }
}
```

The keys provided to `locales` should be the [language identifier](https://developer.apple.com/documentation/xcode/choosing-localization-regions-and-scripts), made up of a [2-letter language code](https://www.loc.gov/standards/iso639-2/php/code_list.php) of your desired language, with an optional region code (e.g. `en-US` or `en-GB`), and the value should point to a JSON file that looks something like this:

```json japanese.json
{
  "CFBundleDisplayName": "こんにちは",
  "NSContactsUsageDescription": "日本語のこれらの言葉"
}
```

Now, iOS knows to set the display name of your app to `こんにちは` whenever it's installed on a device with the language set to Japanese.
