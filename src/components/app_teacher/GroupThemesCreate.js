import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

export default class GroupThemesCreate extends Component {
  state = {
    data: {},
    errors: {}
  }

  render() {
    return (
      <div>
        <h1 className="title">Create a new Group Theme</h1>
        <li>
          <NavLink to="/groupthemesall">All Group Themes</NavLink>
        </li>
      </div>
    );
  }
}
