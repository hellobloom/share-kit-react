:warning: **_Notice_** :warning:

This library is no longer maintained, please use [ssi-sdk](https://github.com/hellobloom/ssi-sdk) instead.

![Share Kit React](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

**Important**: This repository is no longer maintained. It has been moved to the [attestations-es](https://github.com/hellobloom/attestations-es/) monorepo.

# Share Kit React

React wrapper for [Share Kit](https://github.com/hellobloom/share-kit#readme)

- [Share Kit React](#share-kit-react)
  - [Installation](#installation)
  - [Usage](#usage)
  - [More](#more)

## Installation

```
npm install --save @bloomprotocol/share-kit-react
```

## Usage

`RequestElement` will render a QR code or button based on the client's platform. By defualt it will render a button when the client is mobile or tablet and on iOS.

```tsx
import * as React from 'react'
import {RequestElement, RequestData, QROptions, ButtonOptions} from '@bloomprotocol/share-kit-react'

const requestData: RequestData = {...}
const buttonOptions: ButtonOptions = {
  callbackUrl: 'https://mysite.com/bloom-callback',
}

<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
/>

// Setting QR Options

const qrOptions: Partial<QROptions> = {
  size: 200,
}

<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
  qrOptions={qrOptions}
/>

// Overriding shouldRenderButton
<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
  shouldRenderButton={(parsedResult) => {
    if (parsedResult.platform.type === 'mobile') return true

    return false
  }}
/>

// Passing props to the container
<RequestElement
  requestData={requestData}
  buttonOptions={buttonOptions}
  className="request-element-container"
/>
```

## More

For more information and documentation see [Share Kit](https://github.com/hellobloom/share-kit#readme)
