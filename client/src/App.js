import React, { Component } from "react";

import { Toast, ToastBody } from "reactstrap";

import userLocation from "./userlocation.svg";
import messageLocation from "./messagelocation.svg";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.css";
import ChatMap from "./components/ChatMap";
import MessageCard from "./components/MessageCard";
import { getMessages, sendMessage, getLocation } from "./api";

import "./App.css";
let userIcon = L.icon({
  iconUrl: userLocation,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
let messageIcon = L.icon({
  iconUrl: messageLocation,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      showChatRoom: false,
      location: {
        lat: 22,
        lng: 80,
      },

      zoom: 5,
      userLocation: false,
      userMessage: {
        name: "",
        message: "",
      },

      showToast: false,
      messages: [],
    };
  }
  validateForm = () => {
    console.log("Validating form");
    const { lat, lng } = this.state.location,
      { name, message } = this.state.userMessage;
    if (lat < -90 || lat > 90)
      return {
        error: "Latitude should be in a range of -90 to 90",
        response: false,
      };
    if (lng < -180 || lng > 180)
      return {
        error: "Longitude should be in a range of -180 to 180",
        response: false,
      };
    if (name.length < 5 || name.length > 50)
      return {
        error: "Name should be 5 to 50 characters long",
        response: false,
      };
    if (message.length < 5 || message.length > 200)
      return {
        error: "Message should be 5 to 200 characters long",
        response: false,
      };

    return {
      error: "",
      response: true,
    };
  };
  formSubmit = (event) => {
    event.preventDefault();

    const { error, response } = this.validateForm();
    if (response) {
      // make an API call
      const message = {
        name: this.state.userMessage.name,
        message: this.state.userMessage.message,
        latitude: this.state.location.lat,
        longitude: this.state.location.lng,
      };
      sendMessage(message)
        .then(() => {
          this.setState({
            showToast: true,
          });
          setTimeout(() => {
            this.setState({
              showToast: false,
            });
          }, 3000);
        })
        .catch((err) => {
          console.log("POST error", err);
        });
    } else {
      console.log(error);
    }
  };
  valueChanged = (event) => {
    this.validateForm();
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value,
      },
    }));
  };
  componentDidMount() {
    // Get messages from database
    getMessages()
      .then((res) => res.json())
      .then((messages) => {
        this.setState({
          messages: messages,
        });
      })
      .catch((err) => {
        console.log("Fetch get error ", err);
      });

    // get Users location
    getLocation().then((location) => {
      this.setState({
        location,
        zoom: 12,
        userLocation: true,
      });
    });
  }
  handleChatRoom = () => {
    this.setState((prevState) => ({
      showChatRoom: !prevState.showChatRoom,
    }));
  };
  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div className="map">
        <ChatMap
          zoom={this.state.zoom}
          userLocation={this.state.userLocation}
          messages={this.state.messages}
          position={position}
          userIcon={userIcon}
          handleChatRoom={this.handleChatRoom}
          showChatRoom={this.state.showChatRoom}
          messageIcon={messageIcon}
        />
        {this.state.showChatRoom ? (
          <MessageCard
            formSubmit={this.formSubmit}
            handleChatRoom={this.handleChatRoom}
            valueChanged={this.valueChanged}
            userLocation={this.state.userLocation}
          />
        ) : (
          ""
        )}
        {this.state.showToast ? (
          <div className="toast-div p-3 my-2 rounded">
            <Toast>
              <ToastBody>Message sent !!</ToastBody>
            </Toast>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
