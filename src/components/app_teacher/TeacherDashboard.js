import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadTeacherDashboard } from "../../store/actions/teacherActions";

class TeacherDashboard extends Component {
  state = {
    createNewClass: false
  };

  componentDidMount() {
    const { fb_auth, authCustomClaim } = this.props;
    const fb_uid = fb_auth.uid;
    this.props.loadTeacherDashboard(fb_uid);
  }

  render() {
    const { fb_auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!fb_auth.uid) return <Redirect to="/signin" />;

    // comments out for now due to refresh issue
    // if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    if (this.state.createNewClass) {
      return <Redirect to="/classcreate" />;
    }

    // Ready to render dashboard
    if (this.props.mongoTeacherData) {
      const {
        first_name,
        last_name,
        default_class,
        school_name,
        current_students,
        current_classes
      } = this.props.mongoTeacherData;

      // make a table
      // Under ICON, green for active, yellow for student pending
      const listOfClasses = current_classes
        ? current_classes.map(singleClass => (
            <tr>
              <td>ICON</td>
              <td>{singleClass.class_description}</td>
              <td>{singleClass.grade_level}</td>
              <td>{singleClass.special_notes}</td>
              <td>{singleClass.join_code}</td>
              <td>#</td>
            </tr>
          ))
        : null;

      return (
        <div className="container">
          <div>
            {/* <h3 className="header text-center">Teacher Dashboard</h3> */}

            <h1 className="header text-center">
              {first_name} {last_name}
            </h1>
            <h2>
              Current class:
              {default_class ? default_class.class_description : null}
            </h2>
            <p>
              New students join request (t/f) - Name Class Requested Admit /
              Deny
            </p>
            {listOfClasses ? (
              <table>
                <thead>
                  <tr>
                    <th>Status</th>
                    <th>Class Description</th>
                    <th>Grade Level</th>
                    <th>Notes</th>
                    <th>Join Code</th>
                    <th>Members</th>
                  </tr>
                </thead>
                <tbody>{listOfClasses}</tbody>
              </table>
            ) : null}
          </div>

          <button>
            {" "}
            <NavLink to="/classcreate">Create a Class</NavLink>
          </button>
        </div>
      );
    } else {
      return <h1>Loading</h1>;
    }
  }
}

const mapStateToProps = state => {
  return {
    fb_auth: state.firebase.auth,
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
