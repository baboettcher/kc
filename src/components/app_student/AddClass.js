import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { studentAddClassWithCode } from "../../store/actions/studentActions";
import Modal from "../common/modal";

//import PropTypes from "prop-types";

class AddClass extends Component {
  state = {
    joinCode: "",
    showModal: false,
    returnToDash: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  // >>>> submit is not sending the correct PUT call <<<<<<
  handleSubmit = e => {
    e.preventDefault();
    console.log("joincode", this.state.joinCode);
    // check code and display result
    // as user to confirm or reject
    // rejct reutrn to dashboard
    // confirm, add to student record current_classes
    // add to field {enrollmentStatus: pending/accepted}
    // and add to teacher array of students
    // add field {enrollmentCondirmed: false}
    // if teacher hit reject, run ** DeleteStudentFromClass
  };

  onModalClose() {
    this.setState({
      showModal: false,
      returnToDash: true,
      joinCode: ""
    });
  }

  render() {
    const { auth, authCustomClaim, mongoTeacherData } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (this.state.returnToDash) return <Redirect to="/teacher" />;

    // TEMP
    // if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div className="container">
        {this.state.showModal ? (
          <Modal
            mainText={"ADDED:" + this.state.classDescription}
            subtitle1={this.state.specialNotes}
            onModalClose={this.onModalClose.bind(this)}
          />
        ) : null}

        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Enter a class code:</h5>

          <div className="input-field">
            <label htmlFor="joinCode">5-digit join code</label>
            <input
              type="text"
              id="joinCode"
              value={this.state.joinCode}
              onChange={this.handleChange}
            />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Submit:</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoStudentData: state.student.mongoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    studentAddClassWithCode: (newClassInfo, studentId) =>
      dispatch(studentAddClassWithCode(newClassInfo, studentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClass);
