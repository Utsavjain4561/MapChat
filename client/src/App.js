import React, { Component } from "react";
import * as data from "./hotspots.json";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "./App.css";
var myIcon = L.icon({
  iconUrl:
    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  iconSize: [20, 20],
  iconAnchor: [10, -20],
  popupAnchor: [0, 0],
});
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      lat: 22,
      lng: 80,
      zoom: 5,
      userLocation: false,
    };
  }
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        this.setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          zoom: 12,
          userLocation: true,
        });
      },
      (err) => {
        console.log("Location Blocked by user");
      },
      { maximumAge: 10000, timeout: 5000, enableHighAccuracy: true }
    );
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Map className="map" center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.userLocation ? (
          <Marker icon={myIcon} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ) : (
          ""
        )}
      </Map>
    );
  }
}
