/* @flow */

import Koa from 'koa';
import Debug from 'debug';
import Router from 'koa-router';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import Pug from 'koa-pug';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { graphqlKoa } from 'graphql-server-koa';
import { printSchema } from 'graphql/utilities/schemaPrinter';

import 'css-modules-require-hook/preset';

import client from '../shared/apolloClient';
import schema from './data/schema';
import configureStore from '../shared/configureStore';
import App from '../shared/components/App';
import { DEV, DEV_PORT, PORT, DEBUG_TARGET } from '../config';

const store = configureStore();

const router = new Router();
const pug = new Pug({ viewPath: './views' });
const app = new Koa();
const debug = new Debug(DEBUG_TARGET);

pug.use(app);

router.post('/graphql', graphqlKoa({ schema }));
router.get('/schema', (ctx) => {
  ctx.body = printSchema(schema);
});

app.use(compress());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

router.get('*', (ctx) => {
  const resourcePath = DEV ? `http://localhost:${DEV_PORT}/dist/` : '/dist/';

  const context = createServerRenderContext();
  let markup = renderToString(
    <ApolloProvider store={store} client={client}>
      <ServerRouter
        context={context}
        location={ctx.req.url}
      >
        {(routerContext) => <App router={routerContext} />}
      </ServerRouter>
    </ApolloProvider>,
  );

  const result = context.getResult();

  if (result.redirect) {
    ctx.redirect(301, result.redirect.pathname);
  } else if (result.missed) {
    ctx.statusCode = 404;
    markup = renderToString(
      <ServerRouter
        context={context}
        location={ctx.req.url}
      >
        {(routerContext) => <App router={routerContext} />}
      </ServerRouter>,
    );
  }

  ctx.render('index', {
    resourcePath,
    markup,
  });
});

app.listen(PORT, (err) => {
  if (err) {
    debug(`🚫 ${err}`);
  }

  debug(`✅ Server running on port ${PORT}`);
});
