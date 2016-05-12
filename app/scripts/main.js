/*global config*/
import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, useRouterHistory } from 'react-router';
import routes from './routes';

const browserHistory = useRouterHistory(createHistory)();

render(
  <Router history={browserHistory}>
    {routes}
  </Router>,
  document.getElementById('app')
);
