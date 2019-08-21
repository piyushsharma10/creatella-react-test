import _ from 'underscore'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as actions from '../actions'
import { getProducts } from '../reducers/ProductReducer'

import Header from '../components/Header'
import AdsImage from '../components/AdsImage'
import Product from '../components/Product'

class Products extends Component {

  constructor (props) {
    super(props)
    this.state = {
      products: [],
      params: {
        page: 1,
        sort: 'id',
        limit: 15
      },
      loadingEvent: false,
      checkCatalog: false
    }
  }

  UNSAFE_componentWillMount () {
    const { params } = this.state
    const { getProductsRequest } = this.props.actions
    this.setState({ loadingEvent: true })

    getProductsRequest(params)
  }

  handleScroll(e) {
    const element = e.target
    const { params } = this.state
    const { getProductsRequest } = this.props.actions

    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      const { checkCatalog } = this.state
      params['page'] = params.page + 1
      this.setState({ params, loadingEvent: true })

      getProductsRequest(params)
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.products) {
      let { products } = this.state
      if (nextProps.products.length === 0 && products.length !== 0) {
        this.setState({ checkCatalog: true, loadingEvent: false })
      }

      this.setState({ products: products.concat(nextProps.products), loadingEvent: false })
    }
  }

  productsSortBy (attrib) {
    const { getProductsRequest } = this.props.actions
    const { params } = this.state

    params['sort'] = attrib
    params['page'] = 1
    this.setState({ params, products: [], loadingEvent: true, checkCatalog: false })

    getProductsRequest(params)
  }

  getProducts () {
    const { products } = this.state

    if (products.length > 0) {
      return _.map(products, (product, index) => {
        let elements = []
        elements.push(<Product product={product} key={`product-${index}`} />)

        if ((index+1)%20 == 0) {
          elements.push(<AdsImage key={`ad-${index}`} />)
        }
        return elements
      })
    }
  }

  render () {
    const { params, loadingEvent, checkCatalog } = this.state

    return (
      <div className='product-container' onScroll={(event) => this.handleScroll(event)}>
        <div className="container">
          <Header />
          <div className='sort-options'>
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-success dropdown-toggle dropdown-toggle-split"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
                Sort By - <span>{params.sort}</span> <span className="sr-only">Toggle Dropdown</span>
              </button>
              <div className="dropdown-menu">
                <a
                  className='dropdown-item'
                  href='javascript:void(0)'
                  onClick={() => this.productsSortBy('id')}>ID</a>
                <div className="dropdown-divider"></div>
                <a
                  className='dropdown-item'
                  href='javascript:void(0)'
                  onClick={() => this.productsSortBy('price')}>Price</a>
                <div className="dropdown-divider"></div>
                <a
                  className='dropdown-item'
                  href='javascript:void(0)'
                  onClick={() => this.productsSortBy('size')}>Size</a>
              </div>
            </div>
          </div>
          <div className='row'>
            {this.getProducts()}
          </div>
          <div className='text-center'>
            {loadingEvent && 'Loading...'}
            {checkCatalog && '~ end of catalogue ~'}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    products: getProducts(state)
  }
}

function mapDispatchToProps (dispatch) {
  const { getProductsRequest } = actions
  return {
    actions: bindActionCreators(
      {
        getProductsRequest
      },
      dispatch
    )
  }
}

Products.propTypes = {
  page: PropTypes.number,
  sort: PropTypes.string,
  limit: PropTypes.number,
}

Products.defaultProps = {
  page: 1,
  sort: 'id',
  limit: 30,
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
