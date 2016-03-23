import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import {
  createPage,
  write,
  writeError,
  writeNotFound,
  redirect,
} from '../utilities/server';
import { routes } from '../routes';

const STATIC_ASSET_PATH = path.resolve(__dirname, '..', '..', 'static');
const renderApp = (props, res) => {
  const markup = renderToString(<RouterContext {...props} />);
  const html = createPage(markup);

  write(html, 'text/html', res);
};

export const applyMiddleware = (server) => {
  server.disable('x-powered-by');

  server.use(morgan('dev'));
  server.use(compression());
  server.use('/static', express.static(STATIC_ASSET_PATH));

  // server.use(bodyParser.urlencoded());
  // server.use(bodyParser.json());

  // // Protect against HTTP Parameter Pollution attacks
  // server.use(hpp());

  // // Secure server by setting various HTTP headers
  // // server.use(helmet.contentSecurityPolicy({});
  // server.use(helmet.xssFilter());
  // server.use(helmet.frameguard('deny'));
  // server.use(helmet.ieNoOpen());
  // server.use(helmet.noSniff());

  // Hook onto our SSR route
  server.get('*', function (req, res) {
    const params = {
      routes,
      location: req.url,
    };

    match(params, (error, redirectLocation, renderProps) => {
      if (error) {
        writeError('ERROR!', res);
      } else if (redirectLocation) {
        redirect(redirectLocation, res);
      } else if (renderProps) {
        renderApp(renderProps, res);
      } else {
        writeNotFound(res);
      }
    });
  });
};

