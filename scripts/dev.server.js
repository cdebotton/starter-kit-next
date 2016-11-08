/* @flow */

import express from 'express';
import Debug from 'debug';
import Webpack from 'webpack';
import config from '../webpack.config.babel';

import { DEV_PORT, DEBUG_TARGET } from '../src/config';

const app = express();
const debug = new Debug(DEBUG_TARGET);
const compiler = new Webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  quiet: true,
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(DEV_PORT, (err) => {
  if (err) {
    debug(`🚫 ${err.toString()}`);
  }

  debug(`✅ Development Server running on port ${DEV_PORT}`);
});
