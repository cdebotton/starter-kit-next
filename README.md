# Starter Kit
## About
This is a universal react starter kit with a GraphQL (Apollo) API.

* react / redux / react-redux / react-router
* apollo-client / apollo-react / apollo-server
* graphql / graphql-tools
* flowtype / eslint
* koa / koa-router
* bookshelf / knex / pg (postgresql)
* postcss / postcss-nextcss

### Build tools
webpack / babel / css-modules-require-hook

## Setup
### Install
1. `cd` into project root
2. Run `yarn install`
3. `touch .env` to create an environment file.
4. Start posgtres server
5. `npm bin`/knex migrate:latest
6. Run `npm run dev` to start server.

### .env example
Your `.env` file should look similar to the following, but with information appropriate to your environment.
```
DATABASE_URL=postgresql://localhost/pgdemo
ENV=development
PORT=3000
DEV_PORT=4000
```
