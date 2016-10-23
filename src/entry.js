import React from 'react'
import routes from './routes'
import store from './redux/store'
import Router from 'react-router/lib/router'
import hashHistory from 'react-router/lib/hashHistory'
import Provider from 'react-redux/lib/components/Provider'
import { render } from 'react-dom'

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes} />
  </Provider>,
  document.getElementById('app')
)
