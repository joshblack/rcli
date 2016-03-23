import React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory } from 'react-router';

import './polyfill';
import { routes } from './routes';

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const mountNode = document.getElementById('root');

match({ routes, location }, () => {
  render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('root')
  );
});

