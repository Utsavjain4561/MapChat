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
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
export default class MessageCard extends Component {
  constructor() {
    super();
    this.state = {
      isClose: false,
    };
  }
  handleClose = () => {
    this.setState((prevState) => ({
      isClose: !prevState.isClose,
    }));
  };
  render() {
    return (
      <div>
        {!this.state.isClose ? (
          <Card className="message-form" body>
            <div className="message-header">
              <CardTitle>
                <strong>Welcome to Map Chat!!</strong>
              </CardTitle>
              <FontAwesomeIcon
                onClick={this.handleClose}
                className="close-icon"
                icon={faTimes}
              />
              <CardText>Leave a message with your location</CardText>
            </div>
            <div className="message-body">
              {!this.props.sentMessage ? (
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
              ) : (
                ""
              )}
            </div>
          </Card>
        ) : (
          <Button onClick={this.handleClose} className="add-button">
            <FontAwesomeIcon className="add-button-icon" icon={faPlus} />
          </Button>
        )}
      </div>
    );
  }
}
