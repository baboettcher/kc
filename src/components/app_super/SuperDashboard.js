import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class SuperDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    return (
      <div className="container">
        <h3 className="header text-center">Super Admin</h3>
        <div>
          {" "}
          <h2>Districts</h2>
          <h2>Schools</h2>
          <h2>Teachers</h2>
          <h2>Students</h2>
        </div>
      </div>
    );
  }
}
