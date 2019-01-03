import React, { Component } from "react";

import { Link } from "react-router-dom";

export default class TradeZone extends Component {
  state = {
    teamNames: []
  };

  render() {
    return (
      <div className="container">
        <h3 className="header text-center">TradeZone</h3>
      </div>
    );
  }
}
