import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadTeacherDashboard } from "../../store/actions/teacherActions";

class TeacherDashboard extends Component {
  state = {
    classCreate: false
  };

  componentDidMount() {
    const { fb_auth, authCustomClaim } = this.props;
    const fb_uid = fb_auth.uid;
    console.log("WTF -->>> fb_auth", fb_auth);
    this.props.loadTeacherDashboard(fb_uid);
  }

  render() {
    const { fb_auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!fb_auth.uid) return <Redirect to="/signin" />;

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

      console.log("mongoTeacherData--> ", this.props.mongoTeacherData);

      // make a table
      const listOfClasses = current_classes
        ? current_classes.map(singleClass => (
            <tr>
              <td>{singleClass.class_description}</td>
              <td>{singleClass.grade_level}</td>
              <td>{singleClass.special_notes}</td>
              <td>{singleClass.join_code}</td>
            </tr>
          ))
        : null;

      return (
        <div>
          <h6>
            Basic info:
            {first_name}
            {last_name}
          </h6>
          <div className="container">
            {listOfClasses ? (
              <table>
                <thead>
                  <tr>
                    <th>Class Description</th>
                    <th>Grade Level</th>
                    <th>Notes</th>
                    <th>Join Code</th>
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
