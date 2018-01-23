import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import request from 'request';
import _ from 'lodash';

import BarstenViewer from '../utilities/BarstenViewer.js';

class ReleaseSingle extends Component {

	constructor () {
	  super ();
	  this.state = {
	    tracks: [],
	    release: {}
	  }
	}

	componentDidMount () {
	  const apiUrl = process.env.REACT_APP_APIURL;
	  const releaseId = this.props.match.params.id;

	  // console.log(releaseId);

	  // TODO: Use fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
	  // TODO: Use await: https://davidwalsh.name/async-await

	  request(`${apiUrl}/releaseById/${releaseId}`, (error, response, body) => {
	    if (body) {
	      this.setState({
	        release: JSON.parse(body)
	      });
	    };
	  });

	  request(`${apiUrl}/tracksByReleaseId/${releaseId}`, (error, response, body) => {
	    if (body) {
	      this.setState({
	        tracks: JSON.parse(body)
	      });
	    };
	  });
	}

	parseDate(ISOdate) {
		const date = moment(ISOdate).format('YYYY-MM-DD');
		return date;
	}

	render () {

		const release = this.state.release;
		const tracks = this.state.tracks;

		if (!release) {
		  return <h4>Loading ...</h4>
		}

		let links = release.links ? release.links : [];
		links = _.sortBy(links, 'sortIndex');

		return (
			<div id="releaseEdit">

				<div key={release._id}>

					<div className="container-fluid no-side-padding">

						<div className="release-banner">
							<img src={release.imageUrl} className="img-responsive" alt={`Album cover for ${release.name}`}/>
						</div>
						
						<div className="container no-side-padding">

							<div className="release-single-content">

								<div className="text-center">
									<h2>{release.name}</h2>
								</div>

								<div className="spacer-30"></div>

								<div className="row">
									<div className="col-xs-6 text-capitalize">
										{release.albumType}
									</div>
									<div className="col-xs-6 text-right">
										{this.parseDate(release.releaseDate)}
									</div>
								</div>

								<hr />

								<div className="row link-list">
									{links.map((link) => {
										var target = "_blank";

										// Behavior if link is on same host
										if (link.isLocal) {
											target = '';
										}

										return (
											<div key={link.id} className="col-sm-4 col-xs-6">
												<Link target={target} to={link.url}>{link.name}</Link>
											</div>
										);
									})}
								</div>

								<hr />

								<BarstenViewer content={release.about} placeholder='No about text yet ...'/>

								<hr />

								<h4>Tracks</h4>

								<ul className="track-list">

								{tracks.map((track) => {

									var x = track.duration / 1000;
									const seconds = Math.round(x % 60);
									x = x / 60;
									const minutes = Math.round(x % 60);

									const linkUrl = track.spotifyRaw ? track.spotifyRaw.external_urls.spotify : '#';

									const duration = (minutes && seconds) ? `- ${minutes}:${seconds}` : '';

									return (
										<li key={track._id}>
											<Link to={linkUrl} target="_blank">
												{track.trackNumber} - {track.name} {duration}
											</Link>
										</li>
									);
								})}

								</ul>

								<hr />

							</div>
							
						</div>

					</div>

				</div>

			</div>
		);
	}
}

export default withRouter(ReleaseSingle);