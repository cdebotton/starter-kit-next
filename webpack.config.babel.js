/* @flow */

import webpack from 'webpack';
import path from 'path';
import { DEV, DEV_PORT } from './src/config';

const config = {};

const entryFile: string = path.join(__dirname, 'src', 'client', 'index');

if (DEV) {
  config.devtool = 'eval';
}

const publicPath: string = `http://localhost:${DEV_PORT}/`;

if (DEV) {
  config.entry = [
    'react-hot-loader/patch',
    `webpack-hot-middleware/client?path=${publicPath}__webpack_hmr`,
    entryFile,
  ];
} else {
  config.entry = entryFile;
}

if (DEV) {
  config.output = {
    filename: 'bundle.js',
    publicPath: `${publicPath}dist/`,
    path: path.join(__dirname, 'dist', 'client'),
  };
} else {
  config.output = {
    filename: 'bundle.js',
    publicPath,
    path: path.join(__dirname, 'dist', 'client'),
  };
}

const babelLoader = {
  loader: {
    loader: 'babel',
    query: {
      presets: [['env', {
        targets: {
          browsers: ['last 2 versions'],
        },
        loose: true,
        modules: false,
      }]],
      plugins: [],
    },
  },
  test: /\.js$/,
  include: path.join(__dirname, 'src'),
};

if (DEV) {
  const devBabelLoader = babelLoader;
  devBabelLoader.loader.query.plugins = ['react-hot-loader/babel'];
  config.module = {
    loaders: [
      devBabelLoader,
      {
        loader: 'style!css?modules&localIdentName=[hash:base64:16]!postcss',
        test: /\.css$/,
      },
    ],
  };
} else {
  config.module = {
    loaders: [
      babelLoader,
    ],
  };
}

if (DEV) {
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ];
}

export default config;
