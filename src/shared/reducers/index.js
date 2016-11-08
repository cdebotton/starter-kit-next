/* @flow */

import { combineReducers } from 'redux';
import client from '../apolloClient';
import counter from './counter';

const rootReducer = combineReducers({
  counter,
  apollo: client.reducer(),
});

export default rootReducer;
