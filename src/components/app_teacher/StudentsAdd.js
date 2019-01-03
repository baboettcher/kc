import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import PropTypes from "prop-types";

export default class StudentsAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="title">Add a Student</h1>
        <li>
          <NavLink to="/studentsall">All Students</NavLink>
        </li>
      </div>
    );
  }
}
