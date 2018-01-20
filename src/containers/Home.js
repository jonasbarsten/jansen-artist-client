import React, { Component } from "react";
import request from 'request';

import "./Home.css";

export default class Home extends Component {

  constructor () {
    super ();
    this.state = {
      artist: {}
    }
  }

  componentDidMount () {
    const apiUrl = process.env.REACT_APP_APIURL;
    const artistName = process.env.REACT_APP_ARTIST_NAME;

    request(`${apiUrl}/artistByName/${artistName}`, (error, response, body) => {
      if (body) {
        this.setState({
          artist: JSON.parse(body)
        });
      };
    });
  }

  render() {

    const artist = this.state.artist;

    if (!artist) {
      return <h4>Loading ...</h4>
    }

    if (artist) {
      console.log(artist);
    }

    return (
      <div className="Home">
        <div className="lander">
          <h1>Scratch</h1>
          <p>A simple note taking app</p>
        </div>
      </div>
    );
  }
}