/* @flow */

import { SET_COUNTER, INCREMENT_COUNTER, DECREMENT_COUNTER } from '../actions/counterActions';

export type State = {
  count: number;
};

type Action = {
  type: string;
  payload: number;
};

const initialState = {
  count: 0,
};

const counter = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case SET_COUNTER:
      return {
        ...state,
        count: action.payload,
      };
    case INCREMENT_COUNTER:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT_COUNTER:
      return {
        ...state,
        count: state.count - 1,
      };
    default: return state;
  }
};

export default counter;
