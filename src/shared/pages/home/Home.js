/* @flow */

import React from 'react';
import { connect } from 'react-redux';

import type { Element } from 'react';

import { increment, decrement } from '../../state/counter';

const mapStateToProps = (state) => ({
  count: state.home.count,
});

type Props = {
  count: number;
  dispatch: Function;
};

const Home = (props: Props): Element<any> => (
  <div>
    <h2>Home</h2>
    <p>Counter: {props.count}</p>
    <button onClick={() => props.dispatch(increment())}>+</button>
    <button onClick={() => props.dispatch(decrement())}>-</button>
  </div>
);

export default connect(mapStateToProps)(Home);
