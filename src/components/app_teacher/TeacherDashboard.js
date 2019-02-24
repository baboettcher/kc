import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;
    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Teacher Dashboard</h3>
        <h4>{auth.displayName}</h4>
        <h5>{auth.uid}</h5>
        <h5>{auth.email}</h5>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(mapStateToProps)(TeacherDashboard);
