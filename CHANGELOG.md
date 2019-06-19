## 4.0.0

**Improvements**

- Use [tsdx](https://github.com/palmerhq/tsdx) to build
- Expand support of react to "^15.0.0 || ^16.0.0"

**Breaking**

- This package no longer provides validation utils, instead use [verify-kit](https://github.com/hellobloom/verify-kit)
- Remove `RequestElementProps.buttonCallbackUrl` in favor of `RequestElementProps.buttonOptions`
  - This will be expanded to include options for button type (signin/signup/verify/etc.) among other things
- React is now a peer dependency, you will need to specify react as a dependency in your `package.json` moving forward

## 2.0.0

**Breaking**

- Pull in latest share-kit to render "Verify with Bloom" button for clients on Android devices

## 1.0.1

**Improvements**:

- Bump to @bloomprotocol/share-kit@4.0.1

## 1.0.0

- Initial release
