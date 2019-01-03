import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class MyRoom extends Component {
  state = {
    tokens: []
  };

  render() {
    return (
      <div className="container">
        <h3 className="header text-center">My room</h3>
      </div>
    );
  }
}
