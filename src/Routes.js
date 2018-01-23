import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import ReleaseSingle from './components/releases/ReleaseSingle';
import NotFound from './components/NotFound';

export default () =>
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/release/:id" exact component={ReleaseSingle} />
    <Route component={NotFound} />
  </Switch>;