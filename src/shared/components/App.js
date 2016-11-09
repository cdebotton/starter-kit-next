/* @flow */

import React from 'react';
import Link from 'react-router/Link';
import Match from 'react-router/Match';
import Miss from 'react-router/Miss';

import type { Element } from 'react';

import Home from './Home';
import Entries from './Entries';
import Users from './Users';
import Admin from './Admin';

import { root, navigation } from '../css/layout.css';
import { activeLink, h1 } from '../css/typography.css';

type Props = {
  router: {
    location: {
      pathname: string;
    };
  };
};

const App = (props: Props): Element<any> => (
  <div className={root}>
    <h1 className={h1}>Starter Kit<sup>(bu)</sup></h1>
    <nav className={navigation}>
      <Link activeOnlyWhenExact activeClassName={activeLink} to="/">Home</Link>
      <Link activeClassName={activeLink} to="/entries">Entries</Link>
      <Link activeClassName={activeLink} to="/users">Users</Link>
    </nav>
    <Match pattern="/" exactly component={Home} />
    <Match pattern="/entries" component={Entries} />
    <Match pattern="/users" component={Users} />
    <Match pattern="/admin" component={Admin} />
    <Miss
      render={() => (
        <div>
          <h2>404</h2>
          <p>Could not find <code>{props.router.location.pathname}</code></p>
        </div>
      )}
    />
  </div>
);

export default App;
