import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkCode,
  studentAddClassWithCode
} from "../../store/actions/studentActions";
import Modal from "../common/modal";

//import PropTypes from "prop-types";

class AddClass extends Component {
  state = {
    joinCode: "",
    modal_problemWithInput: false,
    modal_problemWithInput_text: "",
    modal_checkingCode: false,
    modal_checkingCode_main: "",
    modal_checkingCode_text: "",
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
    // add more specific validation
    if (!this.state.joinCode) {
      this.setState({
        joinCode: "",
        modal_problemWithInput: true,
        modal_problemWithInput_text: "Please enter a valid code"
      });
    } else {
      this.setState({
        modal_checkingCode: true,
        modal_checkingCode_main: `One moment please.`,
        modal_checkingCode_text: `Checking ${this.state.joinCode}`
      });
      // SUBMIT
      // as user to confirm or reject
      // rejct reutrn to dashboard
      // confirm, add to student record current_classes
      // add to field {enrollmentStatus: pending/accepted}
      // and add to teacher array of students
      // add field {enrollmentCondirmed: false}
      // if teacher hit reject, run ** DeleteStudentFromClass
    }
  };

  onModalClose1() {
    this.setState({
      joinCode: "",
      modal_problemWithInput: false,
      modal_problemWithInput_text: "",
      modal_checkingCode: false,
      modal_checkingCode_main: "",
      modal_checkingCode_text: "",
      returnToDash: false
    });
  }

  render() {
    const { auth, authCustomClaim, mongoStudentData } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (this.state.returnToDash) return <Redirect to="/student" />;

    // TEMP
    // if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div className="container">
        {this.state.modal_problemWithInput ? (
          <Modal
            mainText={"Oops!"}
            subtitle1={this.state.modal_problemWithInput_text}
            onModalClose={this.onModalClose1.bind(this)}
          />
        ) : null}

        {this.state.modal_checkingCode ? (
          <Modal
            mainText={this.state.modal_checkingCode_text}
            onModalClose={this.onModalClose1.bind(this)}
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
