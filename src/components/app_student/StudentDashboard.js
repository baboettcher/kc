import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class StudentDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    // if (!auth.uid) return <Redirect to="/signin" />;
    // Add to local storage? browser refreshing clears customclaim
    if (authCustomClaim !== "student") return <Redirect to="./signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Student Dashboard</h3>
        <div>
          {" "}
          <h2>Groups</h2>
          <h2>Peers</h2>
        </div>
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

export default connect(mapStateToProps)(StudentDashboard);
