import React, { Component } from "react";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
export default class MessageCard extends Component {
  render() {
    return (
      <Card className="message-form" body>
        <div className="message-header">
          <CardTitle>
            <strong>Welcome to Map Chat!!</strong>
          </CardTitle>
          <FontAwesomeIcon
            onClick={this.props.handleChatRoom}
            className="close-icon"
            icon={faTimes}
          />
          <CardText>Leave a message with your location</CardText>
        </div>
        <div className="message-body">
          <Form onSubmit={this.props.formSubmit}>
            <FormGroup row>
              <Label for="name" sm={4}>
                Name
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.props.valueChanged}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your name"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="message" sm={4}>
                Message
              </Label>
              <Col sm={10}>
                <Input
                  onChange={this.props.valueChanged}
                  type="textarea"
                  name="message"
                  id="message"
                  placeholder="Enter a message"
                />
              </Col>
            </FormGroup>
            <Button
              type="submit"
              disabled={!this.props.userLocation}
              className="submit-bt"
            >
              Send
            </Button>
          </Form>
        </div>
      </Card>
    );
  }
}
