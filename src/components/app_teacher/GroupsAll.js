import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import PropTypes from "prop-types";

export default class GroupsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="title">All Groups</h1>
        <li>
          <NavLink to="/groupsedit">Edit a Group</NavLink>
        </li>
        <li>
          <NavLink to="/groupscreate">Add a Group</NavLink>
        </li>
      </div>
    );
  }
}
