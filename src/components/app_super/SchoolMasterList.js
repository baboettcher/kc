import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class SchoolMasterList extends Component {
  state = {};
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <h2>Schools</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(SchoolMasterList);
