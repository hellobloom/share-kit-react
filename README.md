![Share Kit React](https://github.com/hellobloom/share-kit/raw/master/images/logo.png)

# Share Kit React

React wrapper for [Share Kit](https://github.com/hellobloom/share-kit#readme)

- [Share Kit](#share-kit)
  - [Installation](#installation)
  - [Usage](#usage)
  - [More](#more)

## Installation

```
npm install --save @bloomprotocol/share-kit-react
```

## Usage

```tsx
const requestData: RequestData = {...}
const qrOptions: QROptions = {
  size: 200,
}

<RequestElement requestData={requestData} {...qrOptions} />

/// Overriding shouldRenderButton
<RequestElement
  requestData={requestData}
  {...qrOptions}
  shouldRenderButton={(parsedResult) => {
    if (parsedResult.platform.type === 'mobile') return true

    return false
  }}
/>
```

## More

For more information and documentation see [Share Kit](https://github.com/hellobloom/share-kit#readme)
