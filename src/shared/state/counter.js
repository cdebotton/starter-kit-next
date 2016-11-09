/* @flow */

export type State = {
  count: number;
};

export type Action = {
  type: string;
  payload?: number;
};

const initialState: State = {
  count: 0,
};

export const SET_COUNTER = 'SET_COUNTER';
export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';

export const increment = (): Action => ({
  type: INCREMENT_COUNTER,
});

export const decrement = (): Action => ({
  type: DECREMENT_COUNTER,
});

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
