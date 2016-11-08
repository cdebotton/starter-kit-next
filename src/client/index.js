/* @flow */
/* eslint-disable global-require */
/* eslint-disable no-underscore-dangle */

import React from 'react';
import Router from 'react-router/BrowserRouter';
import { ApolloProvider } from 'react-apollo';
import createHistory from 'history/createBrowserHistory';
import { render } from 'react-dom';
import ApolloClient from 'apollo-client';
import configureStore from '../shared/configureStore';
import '../shared/css/base.css';

const rootEl = document.getElementById('app');
const json: string = document.getElementById('__STATE__').textContent;
const initialState = JSON.parse(json);
const history = createHistory();

const client = new ApolloClient();

const store = configureStore(client, initialState);

const renderApp = (mount) => {
  const App = require('../shared/components/App').default;

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
  module.hot.accept('../shared/components/App', () => {
    renderApp(rootEl);
  });
}
