/* @flow */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import type { Element } from 'react';

const Entries = ({ data }): Element<any> => (
  <div>
    <h2>Entries</h2>
    {data.posts && data.posts.map(post => (
      <span key={post.id}>{post.title}</span>
    ))}
  </div>
);

const PostsQuery = gql`
query Entries {
  posts {
    id,
    title
  }
}
`;

export default graphql(PostsQuery)(Entries);
