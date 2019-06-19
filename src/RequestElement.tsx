import * as React from 'react'
import {
  renderRequestElement,
  RequestData,
  QROptions,
  ButtonOptions,
  ShouldRenderButton,
  RequestElementResult,
} from '@bloomprotocol/share-kit'

type RequestElementProps = {
  requestData: RequestData
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
  buttonOptions: ButtonOptions
}

class RequestElement extends React.Component<RequestElementProps> {
  private container: HTMLDivElement | null
  private requestElementResult: RequestElementResult | null

  constructor(props: RequestElementProps) {
    super(props)

    this.container = null
    this.requestElementResult = null
  }

  componentDidMount() {
    if (!this.container) return

    const {requestData, shouldRenderButton, qrOptions, buttonOptions} = this.props
    this.requestElementResult = renderRequestElement({
      container: this.container,
      requestData,
      qrOptions,
      shouldRenderButton,
      buttonOptions,
    })
  }

  componentDidUpdate(prevProps: RequestElementProps) {
    if (!this.requestElementResult) return

    const {requestData: prevRequestData, qrOptions: prevQROptions, buttonOptions: prevButtonOptions} = prevProps
    const {requestData, qrOptions, buttonOptions} = this.props

    if (prevRequestData !== requestData || prevQROptions !== qrOptions || prevButtonOptions !== buttonOptions) {
      this.requestElementResult.update({requestData, qrOptions, buttonOptions})
    }
  }

  componentWillUnmount() {
    if (this.requestElementResult) {
      this.requestElementResult.remove()
    }
  }

  render() {
    const {requestData, shouldRenderButton, qrOptions, buttonOptions, ...rest} = this.props
    return (
      <div
        {...rest}
        ref={element => {
          this.container = element
        }}
      />
    )
  }
}

export {RequestElement, RequestElementProps}
