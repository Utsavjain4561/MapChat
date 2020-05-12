import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "leaflet/dist/leaflet.css";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
export default (props) => {
  return (
    <Map className="map" center={props.position} zoom={props.zoom}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {props.userLocation ? (
        <Marker icon={props.userIcon} position={props.position}></Marker>
      ) : (
        ""
      )}
      {props.messages.map((message) => (
        <Marker
          key={message._id}
          icon={props.messageIcon}
          position={[message.latitude, message.longitude]}
        >
          <Popup>
            <strong>{message.name}:</strong>
            {message.message}
          </Popup>
        </Marker>
      ))}
    </Map>
  );
};
