import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadTeacherDashboard } from "../../store/actions/teacherActions";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  componentDidMount() {
    // const { uid: fb_uid } = this.props.auth;
    // console.log("fb_uid", fb_uid);

    const { auth: fb_uid, authCustomClaim } = this.props;
    console.log("auth.uid--(fb_uid.uid)--->", fb_uid.uid);
    console.log("auth.uid--(fb_uid)--->", fb_uid);
    this.props.loadTeacherDashboard();

    // WEDS
    // pass fb__uid into loadTeacherDashbpard
    // display info
    // test if  regular loggin in wokrs
    // add student and refer to them/ one a student is added, who cna erase?

    // load teachers info
    /*     fetch("/users/all_districts")
      .then(districts1 => districts1.json())
      .then(districts2 => {
        this.setState({
          districts: districts2
        });
      })
      .catch(err => {
        console.log("Error on initial load", err);
      });
 */
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Teacher Dashboard</h3>
        <h4>{auth.displayName}</h4>
        <h5>{auth.uid}</h5>
        <h5>{auth.email}</h5>
        <h4>mongo stuff here</h4>
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

const mapDispatchToProps = dispatch => {
  return {
    loadTeacherDashboard: fb_uid => dispatch(loadTeacherDashboard(fb_uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDashboard);
