  /* @flow */

import { pubsub } from './subscriptions';

type Author = {
  id: number;
  firstName: string;
  lastName: string;
};

const authors: Author[] = [
  { id: 1, firstName: 'Tom', lastName: 'Coleman' },
  { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
];

type Post = {
  id: number;
  authorId: number;
  title: string;
  votes: number;
};

const posts: Post[] = [
  { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
  { id: 2, authorId: 2, title: 'GraphQL Rocks', votes: 3 },
  { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
];

type MutationProps = {
  postId: number;
}

const resolveFunctions = {
  Query: {
    posts(): Post[] {
      return posts;
    },
  },
  Mutation: {
    upvotePost(_: any, { postId }: MutationProps): Post {
      const post = posts.find((item) => item.id === postId);
      if (!post) {
        throw new Error(`Couldn't find post with id ${postId}`);
      }
      post.votes += 1;
      pubsub.publish('postUpvoted', post);
      return post;
    },
  },
  Subscription: {
    postUpvoted(post: Post): Post {
      return post;
    },
  },
  Author: {
    posts(author: Author): Post[] {
      return posts.filter((post) => post.authorId === author.id);
    },
  },
  Post: {
    author(post: Post): ?Author {
      return authors.find((author) => author.id === post.authorId);
    },
  },
};

export default resolveFunctions;
