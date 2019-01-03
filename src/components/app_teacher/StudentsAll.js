import React, { Component } from "react";
import { NavLink } from "react-router-dom";
//import PropTypes from "prop-types";

export default class StudentsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1 className="title">All Students</h1>
        <li>
          <NavLink to="/studentsadd">Add A Student</NavLink>
        </li>
      </div>
    );
  }
}
