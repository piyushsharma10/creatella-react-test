import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Layout from '../layouts'
import Products from '../screens/Products'

export default (
  <Layout>
    <Switch>
      <Route startsWith exact strict path='/' render={(props) => <Products {...props} />} />
    </Switch>
  </Layout>
)
