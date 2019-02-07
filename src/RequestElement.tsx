import * as React from 'react'
import {
  renderRequestElement,
  RequestData,
  QROptions,
  ShouldRenderButton,
  RequestElementResult,
} from '@bloomprotocol/share-kit'

type RequestElementProps = {
  requestData: RequestData
  qrOptions?: Partial<QROptions>
  shouldRenderButton?: ShouldRenderButton
  buttonCallbackUrl: string
}

class RequestElement extends React.Component<RequestElementProps> {
  private containerRef: React.RefObject<HTMLDivElement>
  private requestElementResult: RequestElementResult

  constructor(props: RequestElementProps) {
    super(props)

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    if (!this.containerRef.current) return

    const {requestData, shouldRenderButton, qrOptions, buttonCallbackUrl} = this.props
    this.requestElementResult = renderRequestElement({
      container: this.containerRef.current,
      requestData,
      qrOptions,
      shouldRenderButton,
      buttonCallbackUrl,
    })
  }

  componentDidUpdate(prevProps: RequestElementProps) {
    const {requestData: prevRequestData, qrOptions: prevQROptions, buttonCallbackUrl: prevButtonCallbackUrl} = prevProps
    const {requestData, qrOptions, buttonCallbackUrl} = this.props

    if (prevRequestData !== requestData || prevQROptions !== qrOptions || prevButtonCallbackUrl !== buttonCallbackUrl) {
      this.requestElementResult.update({requestData, qrOptions, buttonCallbackUrl})
    }
  }

  componentWillUnmount() {
    this.requestElementResult.remove()
  }

  render() {
    const {requestData, shouldRenderButton, qrOptions, buttonCallbackUrl, ...rest} = this.props
    return <div {...rest} ref={this.containerRef} />
  }
}

export {RequestElement, RequestElementProps}
