import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadTeacherDashboard } from "../../store/actions/teacherActions";

class TeacherDashboard extends Component {
  state = {
    thing1: false
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

    if (this.state.classCreate) {
      return <Redirect to="/classcreate" />;
    }

    // Dashboard page
    if (this.props.mongoTeacherData) {
      const {
        first_name,
        last_name,
        school_name,
        current_students,
        current_classes
      } = this.props.mongoTeacherData;
      return (
        <div className="container">
          <h3>
            {first_name} {last_name}
          </h3>
          <h5>{school_name}</h5>
          <h5>Current students: {current_students.length}</h5>
          <h5>Current classes:(eg) Homeroom #19</h5>
          <h6>Dropdown menu here to select for other array of classes</h6>

          <li>
            <NavLink to="/classcreate">Create a Class</NavLink>
          </li>
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
