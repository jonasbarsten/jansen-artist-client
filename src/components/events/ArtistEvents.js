import React, { Component } from 'react';
import $ from 'jquery';

export default class ArtistEvents extends Component {

	constructor(props) {
		super(props);
		this.state = {
			events: []
		}
	}

	componentDidMount() {
		var request = '';

		const requestUpcoming = "https://api.songkick.com/api/3.0/artists/" + this.props.songkickId + "/calendar.json?location=clientip&apikey=" + process.env.REACT_APP_SONGKICK_API_KEY + '&jsoncallback=?';
		const requestPast = "https://api.songkick.com/api/3.0/artists/" + this.props.songkickId + "/gigography.json?location=clientip&apikey=" + process.env.REACT_APP_SONGKICK_API_KEY + '&jsoncallback=?';

		if (this.props.scope === "past") {
			request = requestPast;
		} else {
			request = requestUpcoming;
		}

		$.getJSON(request, (res) => {

			var eventsArray = (res && res.resultsPage && res.resultsPage.results && res.resultsPage.results.event) ? res.resultsPage.results.event : [];

			if (this.props.scope === "past") {
				eventsArray.reverse();
			}

			eventsArray.map((event) => {

				const onClick = () => {
					window.open(event.uri, '_blank');
				};

				// Comes in format: "Oslo, Norway"
				const rawLocation = event.location.city;
				const city = rawLocation.substr(0,rawLocation.indexOf(','));
				const country = rawLocation.substr(rawLocation.indexOf(',')+1);

				var location = city;

				if (country !== " Norway") {
					location = city + ', ' + country;
				}

				var thisEvent = '';

				if (this.props.scope === "past") {

					thisEvent = 
						<div key={event.id} className="col-sm-6 hover">
							<div className="row event-row" onClick={onClick}>
								<div className="text-uppercase text-center">
									{event.start.date} @ {location}
								</div>
							</div>
						</div>


				} else {

					thisEvent = 

						<div key={event.id} className="row event-row hover" onClick={onClick}>
							<div className="col-xs-4 text-uppercase">
								{event.start.date}
							</div>
							<div className="col-xs-4 text-center text-uppercase">
								{location}
							</div>
							<div className="col-xs-4 text-right text-uppercase">
								{event.venue.displayName}
							</div>
						</div>
				}

				this.setState({
					events: this.state.events.concat(thisEvent)
				});

				return true;
			});
		});
	}

	render () {

		if (this.state.events.length === 0) {
			return <span></span>;
		}

		return (
			<div>
				<hr />
				<div className="events-list">
					<div className="row">
						{this.state.events}
					</div>
					<div className="row">
						<div className="col-md-1 col-md-offset-11 col-xs-2 col-xs-offset-10 text-right">
							<img className="img img-responsive songkick-logo" src="/images/powered-by-songkick-black.png" alt="Songkick logo"/>
						</div>
					</div>
				</div>
			</div>
		);
	}
}