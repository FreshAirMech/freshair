import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import './index.scss';

const Marker = ({ line1, line2 }) => {
  return (
    <div className="marker">
      <div className="marker-text">
        <div>{line1}</div>
        <div>{line2}</div>
      </div>
      <i className="fa fa-map-marker fa-lg"></i>
    </div>
  );
};

const lat = 40.7249712;
const lng = -73.9069504;

export default class SetGoogleMap extends Component {
  static defaultProps = {
    center: {lat: lat, lng: lng},
    zoom: 13
  };

  render() {
    return (
      <div id="google-map">
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Marker
            lat={lat}
            lng={lng}
            line1="59-58 56th Ave"
            line2="Maspeth, NY 11378"
          />
        </GoogleMapReact>
      </div>
    );
  }
}