'use strict';

var fs = require('fs');
var path = require('path');

var file = path.resolve('./static/webpack-assets.json');
var webpackFingerprints = JSON.parse(fs.readFileSync(file, 'utf8'));
var serverFile = webpackFingerprints.server.js;

require('./' + serverFile);

