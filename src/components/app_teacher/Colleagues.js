import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import PropTypes from "prop-types";

class Colleagues extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div>
        <h1 className="title">Colleagues</h1>
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

export default connect(mapStateToProps)(Colleagues);
