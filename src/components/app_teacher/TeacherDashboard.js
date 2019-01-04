import React, { Component } from "react";
import { connect } from "react-redux";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    console.log(this.props);
    return (
      <div className="container">
        <h3 className="header text-center">Teacher Dashboard</h3>
        <div>
          {" "}
          <h3>Students</h3>
          <h3>Groups</h3>
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
