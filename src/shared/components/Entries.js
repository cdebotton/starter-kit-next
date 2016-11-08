/* @flow */

import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import type { Element } from 'react';

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

type Post = {
  id: number;
  title: string;
  author: Author;
};

type Props = {
  data: {
    loading: boolean;
    posts: Post[];
  };
};

const Entries = ({ data: { loading, posts } }: Props): Element<any> => (
  <div>
    <h2>Entries</h2>
    {loading && <p>Loading...</p>}
    {posts && (
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <span> by <em>{post.author.firstName} {post.author.lastName}</em></span>
          </li>
        ))}
      </ul>
    )}
  </div>
);

const PostsQuery = gql`
query Entries {
  posts {
    id,
    title,
    author {
      id,
      firstName,
      lastName
    }
  }
}
`;

export default graphql(PostsQuery)(Entries);
