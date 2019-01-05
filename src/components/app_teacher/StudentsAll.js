import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

class StudentsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { students } = this.props;

    const listOfStudents =
      students.current &&
      students.current.map(student => {
        return (
          <li key={student.id}>
            {student.first} {student.last}
          </li>
        );
      });

    return (
      <div>
        <h1 className="title">Current Students</h1>
        <ul>{listOfStudents}</ul>

        <li>
          <NavLink to="/studentsadd">Add A Student</NavLink>
        </li>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    students: state.students
  };
};

export default connect(mapStateToProps)(StudentsAll);
