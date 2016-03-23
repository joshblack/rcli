'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var babelOptions = require('./resources/babel/babelOptions').babelBaseOptions;

var NODE_ENV = process.env.NODE_ENV || 'development';
var BUILD_PATH = path.resolve(__dirname, 'static');

var assetsPluginInstance = new AssetsPlugin({
  filename: 'static/webpack-assets.json',
});

var externals = fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .concat(['react-dom/server'])
  .reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;

    return ext;
  }, {});

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(NODE_ENV),
    },
    '__DEV__': JSON.stringify(NODE_ENV === 'development'),
  }),
  assetsPluginInstance,
  new ExtractTextPlugin('main.[hash].css', { allChunks: true })
];

var postcssConfig = [
  require('autoprefixer'),
  require('postcss-modules-values')
];

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      server: path.resolve(__dirname, 'src', 'server', 'index.js'),
    },
    output: {
      path: BUILD_PATH,
      publicPath: '/static/',
      filename: '[name].[hash].js'
    },
    target: 'node',
    externals: externals,
    node: {
      __filename: true,
      __dirname: true
    },
    plugins: plugins,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: babelOptions,
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(
            'style',
            'css?modules&importLoaders=1&localIdentName=[hash:base64:5]&minimize',
            'postcss'
          )
        }
      ],
    },
    postcss: postcssConfig,
  },
  {
    devtool: 'source-map',
    entry: './src/index',
    output: {
      path: BUILD_PATH,
      publicPath: '/static/',
      filename: '[name].[hash].js',
      chunkFilename: '[id].[hash].chunk.js',
    },
    plugins: plugins,
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          query: babelOptions,
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          loaders: [
            'style',
            'css?modules&importLoaders=1&localIdentName=[hash:base64:5]&minimize',
            'postcss'
          ]
        }
      ],
    },
    postcss: postcssConfig,
  }
];

