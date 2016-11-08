/* @flow */

import { combineReducers } from 'redux';
import counter from './counter';

type Client = {
  reducer: () => any;
}

const createRootReducer = (client: Client) => combineReducers({
  counter,
  apollo: client.reducer(),
});

export default createRootReducer;
