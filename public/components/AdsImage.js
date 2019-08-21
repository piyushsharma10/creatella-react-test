import React, { Component } from 'react'

class AdsImage extends Component {

  render () {
    return(
      <div className='col-sm-6'>
        <div className='img-container'>
          <img
            src={`/ads/?r=${Math.floor(Math.random()*1000)}`}
            className='ads-img'
          />
        </div>
      </div>
    )
  }

}

export default AdsImage
