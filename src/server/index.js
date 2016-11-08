/* @flow */

import Koa from 'koa';
import Debug from 'debug';
import Router from 'koa-router';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import Pug from 'koa-pug';
import React from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { renderToString } from 'react-dom/server';
import { renderToStringWithData } from 'react-apollo/server';
import { ServerRouter, createServerRenderContext } from 'react-router';
import { graphqlKoa } from 'graphql-server-koa';
import { printSchema } from 'graphql/utilities/schemaPrinter';

import 'css-modules-require-hook/preset';
import 'isomorphic-fetch';

import schema from './data/schema';
import configureStore from '../shared/configureStore';
import App from '../shared/components/App';
import { DEV, DEV_PORT, PORT, DEBUG_TARGET } from '../config';

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

router.get('*', async (ctx) => {
  const resourcePath = DEV ? `http://localhost:${DEV_PORT}/dist/` : '/dist/';
  const context = createServerRenderContext();
  const client = new ApolloClient({
    ssrMode: true,
    networkInterface: createNetworkInterface({
      uri: `http://localhost:${PORT}/graphql`,
      credentials: 'same-origin',
      headers: ctx.req.headers,
    }),
  });

  const store = configureStore(client);

  const reactApp = (
    <ApolloProvider store={store} client={client}>
      <ServerRouter
        context={context}
        location={ctx.req.url}
      >
        {(routerContext) => <App router={routerContext} />}
      </ServerRouter>
    </ApolloProvider>
  );

  const apolloResult = await renderToStringWithData(reactApp);
  let { markup } = apolloResult;
  const { initialState } = apolloResult;
  const result = context.getResult();

  if (result.redirect) {
    ctx.redirect(301, result.redirect.pathname);
  } else if (result.missed) {
    ctx.statusCode = 404;
    markup = renderToString(reactApp);
  }

  ctx.render('index', {
    resourcePath,
    markup,
    state: JSON.stringify(initialState),
  });
});

app.listen(PORT, (err) => {
  if (err) {
    debug(`🚫 ${err}`);
  }

  debug(`✅ Server running on port ${PORT}`);
});
