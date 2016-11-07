/* @flow */

import Koa from 'koa';
import Debug from 'debug';
import Router from 'koa-router';
import Pug from 'koa-pug';
import React from 'react';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ServerRouter, createServerRenderContext } from 'react-router';

import 'css-modules-require-hook/preset';

import configureStore from '../shared/configureStore';
import App from '../shared/components/App';
import { DEV, DEV_PORT, PORT, DEBUG_TARGET } from '../config';

const store = configureStore();

const router = new Router();
const pug = new Pug({ viewPath: './views' });
const app = new Koa();
const debug = new Debug(DEBUG_TARGET);

pug.use(app);
app.use(router.routes());

router.get('*', (ctx) => {
  const resourcePath = DEV ? `http://localhost:${DEV_PORT}/dist/` : '/dist/';

  const context = createServerRenderContext();
  let markup = renderToString(
    <Provider store={store}>
      <ServerRouter
        context={context}
        location={ctx.req.url}
      >
        {(routerContext) => <App router={routerContext} />}
      </ServerRouter>
    </Provider>,
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
