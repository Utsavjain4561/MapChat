import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";

export default class ChatMap extends Component {
  render() {
    return (
      <Map className="map" center={this.props.position} zoom={this.props.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.props.userLocation ? (
          <Marker
            icon={this.props.userIcon}
            position={this.props.position}
          ></Marker>
        ) : (
          ""
        )}
        {this.props.messages.map((message) => (
          <div key={message._id}>
            <Marker
              icon={this.props.messageIcon}
              onclick={this.props.handleChatRoom}
              position={[message.latitude, message.longitude]}
            >
              {this.props.showChatRoom ? (
                <Popup>
                  <strong>{message.name}:</strong>
                  {message.message}
                </Popup>
              ) : (
                ""
              )}
            </Marker>
          </div>
        ))}
      </Map>
    );
  }
}
