/* @flow */
/* eslint-disable global-require */

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import createRootReducer from './reducers';

const configureStore = (client, preloadedState) => {
  const rootReducer = createRootReducer(client);

  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(client.middleware(), thunk),
    ),
  );

  if (module.hot) {
    // $FlowIgnore: Flow doesn't understand module.hot.accept.
    module.hot.accept('./reducers', () => {
      const nextCreateRootReducer = require('./reducers').default;
      const nextRootReducer = nextCreateRootReducer(client);
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
