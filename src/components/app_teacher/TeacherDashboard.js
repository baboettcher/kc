import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadTeacherDashboard } from "../../store/actions/teacherActions";

class TeacherDashboard extends Component {
  state = {
    teamNames: []
  };

  componentDidMount() {
    const { auth, authCustomClaim } = this.props;
    const fb_uid = auth.uid;
    this.props.loadTeacherDashboard(fb_uid);
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // console.log("MTD", this.props.mongoTeacherData);
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    if (this.props.mongoTeacherData) {
      const { first_name, last_name } = this.props.mongoTeacherData;
      return (
        <div className="container">
          <h3 className="header text-center">Teacher Dashboard</h3>
          <h4>{first_name}</h4>
          <h5>{last_name}</h5>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoTeacherData: state.teacher.mongoData
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
