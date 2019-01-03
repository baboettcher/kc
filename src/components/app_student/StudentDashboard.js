import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class StudentDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    return (
      <div className="container">
        <h3 className="header text-center">Student Dashboard</h3>
        <div>
          {" "}
          <h2>Groups</h2>
          <h2>Peers</h2>
        </div>
      </div>
    );
  }
}
