import React from 'react'

import {RequestElement} from '../index'

class Logo extends React.Component {
  state = {hideLogo: false}

  render() {
    return (
      <div>
        <input
          type="checkbox"
          checked={this.state.hideLogo}
          onChange={() => this.setState({hideLogo: !this.state.hideLogo})}
        />
        <label>Hide center logo</label>
        <br />
        <RequestElement {...this.props} qrOptions={{...(this.props.qrOptions || {}), hideLogo: this.state.hideLogo}} />
      </div>
    )
  }
}

export {Logo}
