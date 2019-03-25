import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addStudent } from "../../store/actions/studentActions";

//import PropTypes from "prop-types";

class StudentsAdd extends Component {
  state = {
    id: "",
    first: "",
    last: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    this.props.addStudent(this.state);
  };

  render() {
    return (
      <div>
        <h1 className="title">Add a Student</h1>

        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Add a new student</h5>

            <div className="input-field">
              <input type="text" id="first" onChange={this.handleChange} />
              <label htmlFor="first">First</label>
            </div>

            <div className="input-field">
              <input type="text" id="last" onChange={this.handleChange} />
              <label htmlFor="last">Last</label>
            </div>
            <div className="input-field">
              <input type="text" id="id" onChange={this.handleChange} />
              <label htmlFor="id">Student ID</label>
            </div>

            <div className="input-field">
              <button className="btn pink lighten-1">Create</button>
            </div>
          </form>
        </div>

        <li>
          <NavLink to="/studentsall">All Students</NavLink>
        </li>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addStudent: studentInfo => dispatch(addStudent(studentInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(StudentsAdd);
