import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Teacher Dashboard</h3>
        <h4>{auth.uid}</h4>
        <h4>{auth.email}</h4>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(TeacherDashboard);

/* 
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth, students } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    // currently add, but divide by class
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
      <div className="container">
        <h3 className="header text-center">Teacher Dashboard</h3>
        <div>
          {" "}
          <ul>
            Students
            {listOfStudents}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // reduce the amount of state used
    auth: state.auth,
    groups: state.groups,
    students: state.students,
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps)(TeacherDashboard);
 */
