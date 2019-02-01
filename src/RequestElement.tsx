import * as React from 'react'
import {
  RequestData,
  QROptions,
  ShouldRenderButton,
  renderRequestElement,
  RequestElementResult,
} from '@bloomprotocol/share-kit'

type RequestElementProps = Partial<QROptions> & {
  requestData: RequestData
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

    const {requestData, shouldRenderButton, ...qrOptions} = this.props
    this.requestElementResult = renderRequestElement(
      this.containerRef.current,
      requestData,
      qrOptions,
      shouldRenderButton
    )
  }

  componentDidUpdate(prevProps: RequestElementProps) {
    const {requestData: prevRequestData, shouldRenderButton: _, ...prevQROptions} = prevProps
    const {requestData, shouldRenderButton: _2, ...qrOptions} = this.props

    if (prevRequestData !== requestData || prevQROptions !== requestData) {
      this.requestElementResult.update(requestData, qrOptions)
    }
  }

  componentWillUnmount() {
    this.requestElementResult.remove()
  }

  render() {
    return <div ref={this.containerRef} />
  }
}

export {RequestElement, RequestElementProps}
