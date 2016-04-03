import React from 'react';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';

const rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    component: require('app'),
    getIndexRoute(location, callback) {
      require.ensure([], function (require) {
        callback(null, {
          component: require('app/dashboard')
        })
      })
    },
    getChildRoutes(location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          require('./article')
        ])
      })
    }
  }]
};

render(
  <Router history={hashHistory} routes={rootRoute}/>,
  document.getElementById('app')
);