import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class SuperDashboard extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    // if (!auth.uid) return <Redirect to="/signin" />;
    // Add to local storage? browser refreshing clears customclaim

    if (authCustomClaim !== "super") return <Redirect to="./signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Super Admin Dashboard</h3>
        <h4>{auth.displayName === null ? "Nada" : auth.displayName}</h4>
        <h6>{auth.uid}</h6>
        <h6>{auth.email}</h6>
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

export default connect(mapStateToProps)(SuperDashboard);
