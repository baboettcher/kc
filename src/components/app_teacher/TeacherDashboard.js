import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    return (
      <div className="container">
        <h3 className="header text-center">Teacher Dashboard</h3>
        <div>
          {" "}
          <h3>Students</h3>
          <h3>Groups</h3>
        </div>
      </div>
    );
  }
}
