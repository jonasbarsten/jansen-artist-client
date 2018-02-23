import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import VivusContainer from '../utilities/VivusContainer';

class NavBar extends Component {

	goBack () {
		this.props.history.goBack();
	}

	render() {

		if (this.props.location.pathname === '/') {
			return null
		}

		const color = (this.props.artist === "Death By Unga Bunga") ? "white" : "black";

		return (
			<div id="back-button" className="hover">
				<VivusContainer duration={50}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={this.goBack.bind(this)}>
						<path 
							d="M160,256L313.594,96L352,141.718L236.813,256L352,370.281L313.594,416L160,256z"
							stroke={color}
							strokeMiterlimit="10"
							strokeWidth="10"
							fill="none"
						/>
					</svg>
				</VivusContainer>
			</div>
		);
	}

}

export default withRouter(NavBar);

