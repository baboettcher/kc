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
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;

    // comments out for now due to refresh issue
    // if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

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

      // make a table
      const listOfClasses = current_classes.map(a => (
        <ul>
          <h6>
            <strong>{a.classTitle}</strong> Grade: {a.gradeLevel} Notes:
            {a.specialNotes} Join Code: {a.joinPasscode}
          </h6>
        </ul>
      ));

      return (
        <div className="container">
          <h3>
            {first_name} {last_name}
          </h3>
          <h5>{school_name}</h5>
          <h5>Current classes: {current_classes.length}</h5>
          {listOfClasses}

          <h5>Current students - NEXT : {current_students.length}</h5>

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
