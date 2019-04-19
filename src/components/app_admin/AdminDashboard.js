import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadAdminDashboard } from "../../store/actions/adminActions";

class AdminDashboard extends Component {
  state = {
    addNewSchool: false
  };

  componentDidMount() {
    const { fb_auth, authCustomClaim } = this.props;
    const fb_uid = fb_auth.uid;
    this.props.loadAdminDashboard(fb_uid);
  }

  render() {
    const { fb_auth, authCustomClaim } = this.props;
    // temp guard until local storage
    // if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "admin") return <Redirect to="/signin" />;

    // ADD NEW SCHOOL ROUTE
    // if (this.state.addNewSchool) {
    //   return <Redirect to="/addNewSchool" />;
    // }

    // Ready to render dashboard
    if (this.props.mongoAdminData) {
      const {
        first_name,
        last_name,
        school_name,
        current_students,
        current_classes
      } = this.props.mongoAdminData;

      return (
        <div className="container">
          <h3 className="header text-center">District Admin Dashboard</h3>
          <div>
            {" "}
            <h5>Overview:</h5>
            <h5>Schools</h5>
            <h5>Teachers</h5>
            <h5>Students</h5>
          </div>
        </div>
      );
    } else {
      return <h1>Loading Admin</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    fb_auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoAdminData: state.admin.mongoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAdminDashboard: fb_uid => dispatch(loadAdminDashboard(fb_uid))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminDashboard);
