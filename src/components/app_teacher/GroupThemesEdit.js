import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import PropTypes from "prop-types";

export default class GroupThemeEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="title">Edit Group Theme</h1>
        <li>
          <NavLink to="/groupthemesall">All Group Themes</NavLink>
        </li>
      </div>
    );
  }
}
