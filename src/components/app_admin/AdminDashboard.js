import React, { Component } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Link } from "react-router-dom";

class AdminDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    // if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "admin") return <Redirect to="/signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Super Ad</h3>
        <div>
          {" "}
          <h5>Schools</h5>
          <h5>Teachers</h5>
          <h5>Students</h5>
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

export default connect(mapStateToProps)(AdminDashboard);
