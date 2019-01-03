import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import PropTypes from "prop-types";

export default class GroupEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="title">Edit Group</h1>
        <li>
          <NavLink to="/groupsall">All Groups</NavLink>
        </li>
      </div>
    );
  }
}
