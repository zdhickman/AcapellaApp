/*global config*/
import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Pages
import App from './pages/App';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const routes = (
  <Route name='app' path='/' component={ App }>
    <IndexRoute name='home' component={ Home } />
    <Route name='notFound' path="*" component={ NotFound } />
  </Route>
);

export default routes;
