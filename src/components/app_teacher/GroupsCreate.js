import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

export default class GroupsCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="title">Create a new Group</h1>
        <li>
          <NavLink to="/groupsall">All Groups</NavLink>
        </li>
      </div>
    );
  }
}
