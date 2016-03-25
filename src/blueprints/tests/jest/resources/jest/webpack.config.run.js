'use strict';

/**
 * This webpack configuration file is used as configuration for the
 * `babel-plugin-webpack-loaders` plugin in order to leverage css modules in
 * the browser.
 */
module.exports = {
  output: {
    // The library target must be set as commonjs2
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        ]
      }
    ]
  },
  postcss: [
    require('autoprefixer'),
    require('postcss-modules-values')
  ]
};
