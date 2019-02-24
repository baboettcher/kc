import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

class StudentsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth, authCustomClaim, students } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

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
    students: state.students,
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(mapStateToProps)(StudentsAll);
