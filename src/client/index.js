/* @flow */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import Router from 'react-router/BrowserRouter';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';

import configureStore from '../shared/configureStore';
import '../shared/css/base.css';

const rootEl = document.getElementById('app');
const history = createHistory();

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);

const renderApp = (mount) => {
  const App = require('../shared/components/App').default;

  render(
    <Provider store={store}>
      <Router history={history}>
        {(router) => <App router={router} />}
      </Router>
    </Provider>,
    mount,
  );
};

renderApp(rootEl);

if (module.hot) {
  // $FlowIgnore: suppressing this error as flow doesn't recognize module.hot
  module.hot.accept('../shared/components/App', () => {
    renderApp(rootEl);
  });
}
