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

    const {requestData, shouldRenderButton, qrOptions} = this.props
    this.requestElementResult = renderRequestElement({
      container: this.containerRef.current,
      requestData,
      qrOptions,
      shouldRenderButton,
    })
  }

  componentDidUpdate(prevProps: RequestElementProps) {
    const {requestData: prevRequestData, qrOptions: prevQROptions} = prevProps
    const {requestData, qrOptions} = this.props

    if (prevRequestData !== requestData || prevQROptions !== qrOptions) {
      this.requestElementResult.update({requestData, qrOptions})
    }
  }

  componentWillUnmount() {
    this.requestElementResult.remove()
  }

  render() {
    const {requestData, shouldRenderButton, qrOptions, ...rest} = this.props
    return <div {...rest} ref={this.containerRef} />
  }
}

export {RequestElement, RequestElementProps}
