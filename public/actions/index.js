import _ from 'underscore'
import fetch from 'isomorphic-fetch'

export const GET_PRODUCTS = 'GET_PRODUCTS'

function getProducts (res) {
  return {
    type: GET_PRODUCTS,
    products: res
  }
}

export function getProductsRequest (params) {
  const { sort, page, limit } = params
  return (dispatch) => {
    return fetch(`http://localhost:3000/api/products?_sort=${sort || 'id'}&_page=${page || 1}&_limit=${limit}`, { method: 'get', headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        return data
      })
      .then((res) => {
        dispatch(getProducts(res))
      })
      .catch((error) => {
        console.error(error)
      });
  }
}
