/* @flow */

import React from 'react';
import Match from 'react-router/Match';

import type { Element } from 'react';

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signout(cb) {
    this.isAuthenticated = false;
    cb();
    setTimeout(cb, 100);
  },
};

const MatchWhenAuthorized = ({ component: Component, ...rest }) => (
  <Match
    {...rest}
    render={() => (
      <div />
    )}
  />
);

const Admin = (): Element<any> => (
  <div>
    <h2>Admin</h2>
  </div>
);

export default Admin;
