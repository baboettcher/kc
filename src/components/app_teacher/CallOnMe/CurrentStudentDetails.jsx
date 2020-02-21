import React, { Component } from "react";
import "./App.css";
import RenderStudentAvatar from "../RenderStudentAvatar"
import { Container, Button } from 'semantic-ui-react'

class CurrentStudentDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { uid, first_name, last_name, avatarId } = this.props.currentStudent;

    return (
      <Container>
        <RenderStudentAvatar size="200px" avatarId={avatarId} />
        <h1 className="name-called">
          {this.props.currentStudent.uid !== "" ? first_name : null}
        </h1>
        <h3>{this.props.currentStudent.uid !== "" ? last_name : null}</h3>
      </Container>
    );
  }
}

export default CurrentStudentDetails;
