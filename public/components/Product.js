import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Product extends Component {

  timestamp (date) {
    var result
    const currentDate = new Date();
    const productDate = new Date(date)
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;

    const timeSince = currentDate - productDate;

    if (timeSince > msPerHour && timeSince < msPerDay) {
      result = Math.round(timeSince/msPerHour)
      return result + ` hour${result > 1 ? 's' : ''} ago`;
    }
    else if (timeSince > msPerDay && timeSince < msPerWeek) {
      result = Math.round(timeSince/msPerDay)
      return result + ` day${result > 1 ? 's' : ''} ago`;
    }
    else {
      return date;
    }
  }

  getPrice (price) {
    return parseInt(price, 10) / 100
  }

  render () {
    const { face, size, price, date } = this.props.product

    return (
      <div className='col-sm-6'>
        <div className='main-products d-flex flex-column'>
          <div className='faces-icon mb-auto' style={{ fontSize: `${size}px` }}>{face}</div>
          <div className='d-flex flex-column '>
            <p className='price-tag'>Price : ${this.getPrice(price)}</p>
            <p className='date'>Date : {this.timestamp(date)}</p>
          </div>
        </div>
      </div>
    )
  }
}

Product.propTypes = {
  size: PropTypes.number,
  price: PropTypes.number,
  date: PropTypes.number,
  face: PropTypes.string,
}

Product.defaultProps = {
  size: 30,
  price: 1.0,
  date: '',
  face: '',
}

export default Product
