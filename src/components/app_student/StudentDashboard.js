import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadStudentDashboard } from "../../store/actions/studentActions";
import RenderAvatar from './renderAvatar'

class StudentDashboard extends Component {
  state = {
    joinNewClass: false
  };

  componentDidMount() {
    const { fb_auth, authCustomClaim } = this.props;
    const fb_uid = fb_auth.uid;
    this.props.loadStudentDashboard(fb_uid);
  }

  render() {
    const { fb_auth, authCustomClaim } = this.props;

    // temp guard until local storage
    if (!fb_auth.uid) return <Redirect to="/signin" />;

    // Add to local storage / commented out for now due to refresh issue
    //if (authCustomClaim !== "student") return <Redirect to="./signin" />;

    if (this.state.joinNewClass) {
      return <Redirect to="/addclasswithcode" />;
    }

    // Data Loading Test #1
    if (!this.props.mongoStudentData) return <h1>Loading!</h1>;

    const {
      first_name,
      last_name,
      credits,
      school_name,
      tentative_classes,
      current_classes
    } = this.props.mongoStudentData;

    // Data Loading Test #2
    // ISSUE: after state update in reducer, tentative_classes is an array UIDs. These are not populated until loadStudentDashboard finishes, which takes some time.
    // TEMP HACKY SOLUTION: check tentative_classes for existance, then for a length more than 0, then test index 0 to see that it is an object, and not a string. When the array is popuated with objects, state updates properly.

    let tentativeClasses = null;

    if (
      tentative_classes &&
      tentative_classes.length > 0 &&
      typeof tentative_classes[0] === "object"
    ) {
      tentativeClasses = tentative_classes.map((singleClass, i) => (
        <li key={i}>
          {singleClass.teacher_name} {singleClass.grade_level}{" "}
          {singleClass.class_description}
        </li>
      ));

      return (
        <div className="container">
          <h5 className="header text-center">Student Dashboard</h5>
          <div>
            <h1>
              {first_name} {last_name}
            </h1>
            <h2>Kidcoins: {credits}</h2>
            <h5>
              Enrolled tentatively:
              {tentativeClasses}
            </h5>
            <RenderAvatar size="150px" avatarId="sup2" />
            <div className="input-field">
              <button>
                {" "}
                <NavLink to="/addclasswithcode">Add a Class</NavLink>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (tentative_classes.length === 0) {
      return (
        <React.Fragment>
          <h1>
            {first_name} {last_name}
          </h1>

          <h5>You are not currently enrolled in any classes</h5>
          <div className="input-field">
            <button>
              {" "}
              <NavLink to="/addclasswithcode">Add a Class</NavLink>
            </button>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <h1>Loading</h1>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    fb_auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoStudentData: state.student.mongoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadStudentDashboard: fb_uid => dispatch(loadStudentDashboard(fb_uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDashboard);
