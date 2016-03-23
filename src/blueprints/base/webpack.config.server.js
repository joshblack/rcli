'use strict';

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var babelOptions = require('./resources/babel/babelOptions').babelBaseOptions;

var NODE_ENV = process.env.NODE_ENV || 'development';

var externals = fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .concat(['react-dom/server'])
  .reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;

    return ext;
  }, {});

module.exports = {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'src', 'server', 'index.js'),
  output: {
    filename: 'server.bundle.js'
  },
  target: 'node',
  externals: externals,
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(NODE_ENV),
      },
      '__DEV__': JSON.stringify(NODE_ENV === 'development')
    }),
    new ExtractTextPlugin('./static/css/[name].css', { allChunks: true })
  ],
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
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-modules-values')
  ]
};
