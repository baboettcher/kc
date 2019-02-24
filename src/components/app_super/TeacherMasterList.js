import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class TeacherMasterList extends Component {
  state = {};
  render() {
    const { auth, authCustomClaim } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    // add to local storage to prevent clearing when browser refreshes
    if (authCustomClaim !== "super") return <Redirect to="/signin" />;

    return (
      <div>
        <h2>TeacherSP</h2>
        <h1>TEST THE BROWSER REFRESH HERER</h1>
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

export default connect(mapStateToProps)(TeacherMasterList);
