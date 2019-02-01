import * as React from 'react'
import {types, renderRequestElement} from '@bloomprotocol/share-kit'

type RequestElementProps = {
  requestData: types.RequestData
  qrOptions?: Partial<types.QROptions>
  shouldRenderButton?: types.ShouldRenderButton
}

class RequestElement extends React.Component<RequestElementProps> {
  private containerRef: React.RefObject<HTMLDivElement>
  private requestElementResult: types.RequestElementResult

  constructor(props: RequestElementProps) {
    super(props)

    this.containerRef = React.createRef()
  }

  componentDidMount() {
    if (!this.containerRef.current) return

    const {requestData, shouldRenderButton, qrOptions} = this.props
    this.requestElementResult = renderRequestElement(
      this.containerRef.current,
      requestData,
      qrOptions || {},
      shouldRenderButton
    )
  }

  componentDidUpdate(prevProps: RequestElementProps) {
    const {requestData: prevRequestData, qrOptions: prevQROptions} = prevProps
    const {requestData, qrOptions} = this.props

    if (prevRequestData !== requestData || prevQROptions !== qrOptions) {
      this.requestElementResult.update(requestData, qrOptions || {})
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
