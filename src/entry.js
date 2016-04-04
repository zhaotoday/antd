import React from 'react';
import rootRoute from './route';
import store from './store';
import { render } from 'react-dom';
import { Router, hashHistory } from 'react-router';
import { Provider } from 'react-redux';

render(
  <Provider store={store}>
    <Router history={hashHistory} routes={rootRoute}/>
  </Provider>,
  document.getElementById('app')
);