---
title: Build lifecycle hooks
---

There are five EAS Build lifecycle npm hooks that you can set in your **package.json**. See the [Android build process](android-builds.md) and [iOS build process](ios-builds.md) docs to get a better understanding about the internals of the build process.

- `eas-build-pre-install` - executed before EAS Build runs `npm install`.
- `eas-build-post-install` - the behavior depends on the platform and project type:
  - Android - runs after `npm install` and `npx expo prebuild` (if needed)
  - iOS - runs after `npm install`, `npx expo prebuild` (if needed), and `pod install`.
- `eas-build-on-success` - this hook is triggered at the end of the build process if the build was successful.
- `eas-build-on-error` - this hook is triggered at the end of the build process if the build failed.
- `eas-build-on-complete` - this hook is triggered at the end of the build process. You can check the build's status with the `EAS_BUILD_STATUS` environment variable. It's either `finished` or `errored`.

This is an example of how your **package.json** might look like:

```json package.json
{
  "name": "my-app",
  "scripts": {
    "eas-build-pre-install": "echo 123",
    "eas-build-post-install": "echo 456",
    "eas-build-on-success": "echo 789",
    "eas-build-on-error": "echo 012",
    "start": "expo start",
    "test": "jest"
  },
  "dependencies": {
    "expo": "~46.0.0"
    // ...
  }
}
```

## Platform-specific hook behavior

If you would like to run a script (or some part of a script) only for iOS builds or only for Android builds, you can fork the behavior depending on the platform within the script; iOS builds run on macOS (Darwin) and Android builds run on Ubuntu (Linux). See examples for common ways to do this through a shell script or a Node script below.

## Examples

### `package.json` and shell script

```json package.json
{
  "name": "my-app",
  "scripts": {
    "eas-build-pre-install": "./pre-install",
    "start": "expo start",
    // ...
  },
  "dependencies": {
    // ...
  }
}
```

```bash pre-install
#!/bin/bash
# This is a file called "pre-install" in the root of the project

unamestr=$(uname)
if [[ "$unamestr" == 'Linux' ]]; then
  echo "Linux detected, run commands for Android builds here"
elif [[ "$unamestr" == 'Darwin' ]]; then
  echo "macOS detected, run commands for iOS builds here"
fi
```

### `package.json` and Node script

```json package.json
{
  "name": "my-app",
  "scripts": {
    "eas-build-pre-install": "node pre-install.js",
    "start": "expo start",
    // ...
  },
  "dependencies": {
    // ...
  }
}
```

```js pre-install.js
// This is a file called "pre-install.js" in the root of the project
if (process.platform === 'linux') {
  console.log('Linux detected, run commands for Android builds here');
} else if (process.platform === 'darwin') {
  console.log('macOS detected, run commands for iOS builds here');
}
```
