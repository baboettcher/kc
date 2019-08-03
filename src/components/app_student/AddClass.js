import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  joinCodeCheck,
  joinCodeClear,
  studentAddClassWithCode,
  loadStudentDashboard
} from "../../store/actions/studentActions";
import ModalWithButton from "../common/modalWithButton";

class AddClass extends Component {
  state = {
    joinCodeInputted: "",
    returnToDash: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.joinCodeCheck(this.state.joinCodeInputted);
  };

  confirmClassEnrollment() {
    const { joinCode, mongoStudentData } = this.props;
    this.props.studentAddClassWithCode({ joinCode, mongoStudentData });
  }

  componentDidMount() {
    this.props.joinCodeClear();
  }

  componentDidUpdate(prevProps) {
    // if tentative_class increases, setState and return to studentDash
    if (
      prevProps.mongoStudentData &&
      prevProps.mongoStudentData.tentative_classes.length !==
        this.props.mongoStudentData.tentative_classes.length
    ) {
      this.setState({
        returnToDash: true
      });
    }
  }

  render() {
    const {
      auth,
      authCustomClaim,
      mongoStudentData,
      recentClassAdded,
      joinCode
    } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;
    // TEMP: if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;
    if (this.state.returnToDash) return <Redirect to="/student" />;

    if (joinCode && joinCode !== "return-to-dash") {
      return (
        <div>
          {" "}
          <h2>Joincode found!</h2>
          <h3>Teacher:{joinCode.teacher_name}</h3>
          <h3> Class: {joinCode.class_description}</h3>
          <button onClick={this.confirmClassEnrollment.bind(this)}>
            {" "}
            Click to confirm enrollment.
          </button>
        </div>
      );
    } else {
      // SHOW <Spinner />

      if (this.state.showSpinnerWhenChecking) {
        return <h1>SPINNER</h1>;
      } else {
        // No spinner to show and no joincode to confirm
        return (
          <div>
            <h3>joincode NOT found</h3>
            <form className="white" onSubmit={this.handleSubmit}>
              <h1 className="grey-text text-darken-3">Join a new class! </h1>
              <div className="input-field">
                <label htmlFor="joinCodeInputted">Enter 5-digit code:</label>
                <input
                  type="text"
                  id="joinCodeInputted"
                  value={this.state.joinCodeInputted}
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-field">
                <button className="btn pink lighten-1 z-depth-0">
                  Submit:
                </button>
              </div>
            </form>
          </div>
        );
      }
    }
  } // end of render
} //end of AddClass

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoStudentData: state.student.mongoData,
    recentClassAdded: state.student.recentClassAdded,
    joinCode: state.student.join_code
  };
};

const mapDispatchToProps = dispatch => {
  return {
    studentAddClassWithCode: (newClassInfo, studentId) =>
      dispatch(studentAddClassWithCode(newClassInfo, studentId)),
    joinCodeCheck: joinCode => dispatch(joinCodeCheck(joinCode)),
    joinCodeClear: () => dispatch(joinCodeClear()),
    loadStudentDashboard: fb_uid => dispatch(loadStudentDashboard(fb_uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClass);
