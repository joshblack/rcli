'use strict';

var assign = require('object-assign');

var babelBaseOptions = {
  presets: ['react', 'es2015', 'stage-1'],
};

var babelClientOptions = assign({}, babelBaseOptions, {
  env: {
    development: {
      presets: ['react-hmre']
    }
  }
});

var babelServerOptions = assign({}, babelBaseOptions, {
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-webpack-loaders',
          {
            config: './resources/webpack/webpack.config.run.js',
            verbose: false
          }
        ]
      ]
    }
  }
});

var babelTestOptions = assign({}, babelBaseOptions, {
  env: {
    test: {
      plugins: [
        [
          'babel-plugin-webpack-loaders',
          {
            config: './resources/webpack/webpack.config.run.js',
            verbose: false
          }
        ]
      ]
    }
  }
});

exports.babelBaseOptions = babelBaseOptions;
exports.babelClientOptions = babelClientOptions;
exports.babelServerOptions = babelServerOptions;
exports.babelTestOptions = babelTestOptions;

