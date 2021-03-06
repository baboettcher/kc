import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class StudentMasterList extends Component {
  state = {};
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    return (
      <div>
        <h2>Students_SP</h2>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(StudentMasterList);
