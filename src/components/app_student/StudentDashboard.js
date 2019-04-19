import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loadStudentDashboard } from "../../store/actions/studentActions";

class StudentDashboard extends Component {
  state = {
    addClassCode: ""
  };

  componentDidMount() {
    const { fb_auth, authCustomClaim } = this.props;
    const fb_uid = fb_auth.uid;
    console.log("->>> fb_auth", fb_auth);
    this.props.loadStudentDashboard(fb_uid);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAddCodeSubmit = e => {
    e.preventDefault();
    console.log("SUBMITTED CODE ", this.state.addClassCode);
    // this.props.signUpStudent(this.state);
    this.setState(() => {
      return {
        addClassCode: ""
      };
    });
  };

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
        current_students,
        current_classes
      } = this.props.mongoStudentData;

      return (
        <div className="container">
          <h3 className="header text-center">Student Dashboard</h3>
          <div>
            <h6>
              Basic info:
              {first_name}
              {last_name}
            </h6>{" "}
            <h5>Classes:</h5>
            <form className="white" onSubmit={this.handleAddCodeSubmit}>
              <div className="input-field">
                <label htmlFor="addClassCode">Enter class code to join:</label>
                <input
                  type="text"
                  id="addClassCode"
                  value={this.state.addClassCode}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">
                  Submit code
                </button>
              </div>
            </form>
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
