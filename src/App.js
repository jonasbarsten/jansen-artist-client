import React, { Component } from "react";
import Routes from "./Routes";
import Helmet from 'react-helmet';
import _ from 'lodash';

import FrontNav from './components/navigation/FrontNav';

class App extends Component {

	render() {

		const host = window.location.host;

		const artistWebsites = {
		  'localhost:3000': 'Virkelig',
		  'localhost:5000': 'Virkelig',
		  'www.virkeligband.no': 'Virkelig',
		  'www.deathbyungabunga.no': 'Death By Unga Bunga',
		  'www.hajk.no': 'Hajk',
		  'www.electriceye.no': 'Electric Eye'
		};

		const artist = artistWebsites[host];

		const artistLower = _.toLower(artist);

    return (
      <div>
      	<Helmet>
      		<title>{artist}</title>
      		<link rel="stylesheet" href={`/styles/${artistLower}.css`} />
      	</Helmet>
        <FrontNav />
        <Routes artist={artist} />
      </div>
    );
	 }
}

export default App;