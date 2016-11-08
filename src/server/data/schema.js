/* @flow */

import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const schema = `
type Author {
  id: Int!
  firstName: String
  author: Author
  posts: [Post]
}

type Post {
  id: Int!
  title: String
  author: Author
  votes: Int
}

type Query {
  posts: [Post]
}

type Mutation {
  upvotePost(
    postId: Int!
  ): Post
}

type Subscription {
  postUpvoted: Post
}
`;

export default makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});
