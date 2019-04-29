import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  checkJoinCode,
  studentAddClassWithCode
} from "../../store/actions/studentActions";
import Modal from "../common/modal";
import Spinner from "../common/spinner";

//import { join } from "path";
//import PropTypes from "prop-types";

class AddClass extends Component {
  state = {
    joinCode: "",
    modal_problemWithInput: false,
    modal_problemWithInput_text: "",
    modal_checkingCode: false,
    modal_checkingCode_main: "",
    modal_checkingCode_text: "",
    modal_confirmClass: false,
    modal_confirmClass_main: "",
    modal_confirmClass_text: "",
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

      this.props.checkJoinCode(this.state.joinCode);
      // SUBMIT
      // loading spinner

      // modal displays class info

      // STEP 1
      // confirm, add to student record current_classes
      // (LATER: add new step of pending_current_classes)
      // v1 - just add the object
      // v2 - add the objectID -- When do you "populate"

      // STEP 2
      // v1 - push student/name/id object to teacher record
      // WHERE?
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
      modal_checkingCode_main: "", // spinner for now
      modal_checkingCode_text: "",
      modal_confirmClass: false,
      modal_confirmClass_main: "",
      modal_confirmClass_text: "",

      returnToDash: false
    });
  }
  componentUpdate() {
    // fires immediately after rendering with new P or S
    console.log("COMPONENT DID UPDATE FIRING!");
    if (this.props.joinCode) {
      this.setState({
        modal_checkingCode: false,
        modal_checkingCode_main: "",
        modal_checkingCode_text: "",
        modal_confirmClass: true,
        modal_confirmClass_main: "Is this correct?",
        modal_confirmClass_text: this.props.joinCode.teacher_name
      });
    }
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

        {/*         {this.state.modal_checkingCode ? (
          <Modal
            mainText={this.state.modal_checkingCode_text}
            onModalClose={this.onModalClose1.bind(this)}
          />
        ) : null} */}

        {this.state.modal_checkingCode && !this.props.joinCode ? (
          <Spinner />
        ) : (
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
        )}

        {this.props.joinCode ? (
          <Modal
            mainText={"Is this the correct class?"}
            subtitle1={this.props.joinCode.teacher_name}
            onModalClose={this.onModalClose1.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoStudentData: state.student.mongoData,
    joinCode: state.student.join_code
  };
};

const mapDispatchToProps = dispatch => {
  return {
    studentAddClassWithCode: (newClassInfo, studentId) =>
      dispatch(studentAddClassWithCode(newClassInfo, studentId)),
    checkJoinCode: joinCode => dispatch(checkJoinCode(joinCode))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClass);
