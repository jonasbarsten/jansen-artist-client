import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import ReleaseSingle from './components/releases/ReleaseSingle';
import NotFound from './components/NotFound';	

export default (props) => {
	return (
		<Switch>
		  <Route path="/" exact render={() => <Home artist={props.artist} />} />
		  <Route path="/release/:id" exact component={ReleaseSingle} />
		  <Route component={NotFound} />
		</Switch>
	);

}
