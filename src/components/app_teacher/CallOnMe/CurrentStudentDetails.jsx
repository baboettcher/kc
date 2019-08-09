import React, { Component } from "react";
import "./App.css";

class CurrentStudentDetails extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { uid, first_name, last_name } = this.props.currentStudent;

    return (
      <React.Fragment>
        <h1 className="name-called">
          {this.props.currentStudent.uid !== "" ? first_name : null}
        </h1>
        <h3>{this.props.currentStudent.uid !== "" ? last_name : null}</h3>
      </React.Fragment>
    );
  }
}

export default CurrentStudentDetails;
