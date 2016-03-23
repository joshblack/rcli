'use strict';

var babelOptions = require('../../resources/babel/babelOptions');

require('babel-register')(babelOptions.babelServerOptions);
require('./devServer');

