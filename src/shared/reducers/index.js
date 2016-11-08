/* @flow */

import { combineReducers } from 'redux';
import counter from './counter';

const createRootReducer = (client) => {
  return combineReducers({
    counter,
    apollo: client.reducer(),
  });
};

export default createRootReducer;
