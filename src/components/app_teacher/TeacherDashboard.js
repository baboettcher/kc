import React, { Component } from "react";
import { connect } from "react-redux";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { students } = this.props;

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
