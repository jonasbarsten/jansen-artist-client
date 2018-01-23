import React, { Component } from "react";
import request from 'request';
import { withRouter, Link } from 'react-router-dom';
import Masonry from 'react-masonry-component';
import _ from 'lodash';

import ReleaseCard from './releases/ReleaseCard';
import BarstenViewer from './utilities/BarstenViewer';
import ArtistEvents from './events/ArtistEvents';

class Home extends Component {

  constructor () {
    super ();
    this.state = {
      artist: {},
      releases: []
    }
  }

  componentDidMount () {

    const apiUrl = process.env.REACT_APP_APIURL;
    // const artistName = process.env.REACT_APP_ARTIST_NAME;

    // TODO: Use fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // TODO: Use await: https://davidwalsh.name/async-await

    request(`${apiUrl}/artistByName/${this.props.artist}`, (error, response, body) => {
      if (body) {
        this.setState({
          artist: JSON.parse(body)
        });
        request(`${apiUrl}/releasesByArtistId/${this.state.artist._id}`, (error, response, body) => {
          if (body) {
            this.setState({
              releases: JSON.parse(body)
            });
          }
        });
      };
    });
  }

  render() {

    const artist = this.state.artist;
    const releases = this.state.releases;

    if (!artist) {
      return <h4>Loading ...</h4>
    }

    const masonryOptions = {
      transitionDuration: 0
    };

    const songkick = artist.songkickId ? <ArtistEvents songkickId={artist.songkickId} /> : '';
    let links = artist.links ? artist.links : [];
    links = _.sortBy(links, 'sortIndex');

    const bio = artist.bio ? <BarstenViewer content={artist.bio} placeholder='No bio yet ...'/> : null;

    return (
      <div id="artistEdit">
        <div className="artist-banner">
          <img src={artist.imageUrl} className="img-responsive" alt={`Banner for ${artist.name}`} />
        </div>
          <div className="container no-side-padding">
            <div className="artist-single-content">
              <div className="text-center text-uppercase">
                <h2>{artist.name}</h2>
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
              {bio}
              {songkick}
              <hr />

              <Masonry
                className={''} // default '' 
                elementType={'div'} // default 'div'
                options={masonryOptions}
                disableImagesLoaded={false} // default false 
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false 
              >
                {releases.map((release) => {
                  return <ReleaseCard key={release._id} release={release} onClick={() => {this.props.history.push('/release/' + release._id);}}/>
                })}
              </Masonry>

              <hr />
            

            </div>
            
          </div>
      </div>
    );
  }
}

export default withRouter(Home);