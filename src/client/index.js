/* @flow */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import Router from 'react-router/BrowserRouter';
import { ApolloProvider } from 'react-apollo';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import configureStore from '../shared/state/configureStore';

const rootEl = document.getElementById('app');
const json: string = document.getElementById('__STATE__').textContent;
const initialState = JSON.parse(json);
const history = createHistory();

const networkInterface = createNetworkInterface({ uri: '/graphql' });
networkInterface.use([{
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};
    }

    req.options.headers.authorization = localStorage.getItem('token') || null;
    next();
  },
}]);

const client = new ApolloClient({
  networkInterface,
});

const store = configureStore(client, initialState);

const renderApp = (mount) => {
  const App = require('../shared/components/app/App').default;

  render(
    <ApolloProvider store={store} client={client}>
      <Router history={history}>
        {(router) => <App router={router} />}
      </Router>
    </ApolloProvider>,
    mount,
  );
};

renderApp(rootEl);

if (module.hot) {
  // $FlowIgnore: suppressing this error as flow doesn't recognize module.hot
  module.hot.accept('.../shared/components/app/App', () => {
    renderApp(rootEl);
  });
}
