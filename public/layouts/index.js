import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Layout extends Component {

  render () {
    return (
      <div className="layout">
        {this.props.children}
      </div>
    )
  }
}

export default withRouter((Layout))
