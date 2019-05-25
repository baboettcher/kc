import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { loadStudentDashboard } from "../../store/actions/studentActions";

class StudentDashboard extends Component {
  state = {
    addJoinCode: ""
  };

  componentDidMount() {
    const { fb_auth, authCustomClaim } = this.props;
    const fb_uid = fb_auth.uid;
    console.log("==== COMPONENT DID MOUNT =======");
    this.props.loadStudentDashboard(fb_uid);
  }
  /* 
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAddCodeSubmit = e => {
    e.preventDefault();
    this.setState(() => {
      return {
        addJoinCode: ""
      };
    });
  }; */

  render() {
    const { auth, authCustomClaim } = this.props;
    // if (!auth.uid) return <Redirect to="/signin" />;
    // Add to local storage? browser refreshing clears customclaim
    if (authCustomClaim !== "student") return <Redirect to="./signin" />;

    // Dashboard page
    if (this.props.mongoStudentData) {
      const {
        first_name,
        last_name,
        school_name,
        tentative_classes,
        current_classes
      } = this.props.mongoStudentData;

      const tentativeClasses =
        tentative_classes && tentative_classes.length > 0
          ? tentative_classes.map(singleClass => (
              <p>
                {singleClass.teacher_name} {singleClass.grade_level}{" "}
                {singleClass.class_description}
              </p>
            ))
          : null;

      return (
        <div className="container">
          <h3 className="header text-center">Student Dashboard</h3>
          <div>
            <h6>
              Basic info:
              {first_name}
              {last_name}
            </h6>{" "}
            <h5>Enrolled tentatively:</h5>
            {tentativeClasses}
            <div className="input-field">
              <button>
                {" "}
                <NavLink to="/addclasswithcode">Add a Class</NavLink>
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading Student</h1>;
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
