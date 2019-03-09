import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class TradeZone extends Component {
  state = {
    teamNames: []
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "student") return <Redirect to="/signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Trade</h3>
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

export default connect(mapStateToProps)(TradeZone);
