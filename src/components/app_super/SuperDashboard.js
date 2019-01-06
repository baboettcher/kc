import React, { Component } from "react";

export default class SuperDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    return (
      <div className="container">
        <h3 className="header text-center">Super Admin</h3>
      </div>
    );
  }
}
