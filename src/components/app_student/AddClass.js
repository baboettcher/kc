import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  joinCodeCheck,
  joinCodeClear,
  studentAddClassWithCode
} from "../../store/actions/studentActions";
import ModalWithButton from "../common/modalWithButton";
import Modal from "../common/modal";
import Spinner from "../common/spinner";

// import PropTypes from "prop-types";

class AddClass extends Component {
  state = {
    joinCode: "",
    modal_problemWithInput: false,
    modal_problemWithInput_text: "",
    showSpinner: false,
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
        showSpinner: true
      });

      this.props.joinCodeCheck(this.state.joinCode);

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

  onModalClose() {
    this.setState({
      joinCode: "",
      modal_problemWithInput: false,
      modal_problemWithInput_main: "",
      modal_problemWithInput_text: "",
      modal_confirmClass: false,
      modal_confirmClass_main: "",
      modal_confirmClass_text: "",
      showSpinner: false,
      returnToDash: false
    });
  }

  /*   componentUpdate() {
    // fires immediately after rendering with new P or S
    console.log("COMPONENT DID UPDATE FIRING!");
    if (this.props.joinCode) {
      this.setState({
        showSpinner: false,
        modal_confirmClass: true,
        modal_confirmClass_main: "Is this correct?",
        modal_confirmClass_text: this.props.joinCode.teacher_name
      });
    }
  }
 */
  confirmClassEnrollment() {
    console.log("++++JOINING THE CLASS!+++++");

    // spinner
    this.setState({
      joinCode: "", // much of this can be deleted--check
      modal_problemWithInput: false,
      modal_problemWithInput_text: "",
      showSpinner: true,
      modal_confirmClass: false,
      modal_confirmClass_main: "",
      modal_confirmClass_text: "",
      returnToDash: false
    });

    console.log(
      "++++ 1a. DB CALL to ADDCODE: PUSH studend_UID to current_students"
    );
    console.log(
      "++++ 1b. DB CALL to ADDCODE: PUSH studend_UID to pending_students ** later"
    );
    console.log(
      "++++ 2. DB CALL to STUDENT: PUSH addCode_ID to current_classess +++++"
    );
    console.log(
      "++++ 3. DB CALL to STUDENT: PUSH  { teacherNAme, classDescripion, classID} to current_classes_cache"
    );

    console.log(
      "++++ 5. DB CALL to STUDENT: Dashboard loads classes (later both pending and actual"
    );

    console.log(
      "++++ (LATER) 6.  DB CALL to TEACHER: On login, populate all classes with students. Temporarily, populate BOTH pending_students and (confirmed) current_students"
    );

    /*     this.setState({
      joinCode: "",
      modal_problemWithInput: false,
      modal_problemWithInput_text: "",
      showSpinner: true,
      modal_confirmClass: false,
      modal_confirmClass_main: "",
      modal_confirmClass_text: "",
      returnToDash: true
    }); */

    // TEACHER: Push to unconfirmed list in teacherDB
    // STUDENT: Push to awaiting confirmation in student_class_list
  }
  componentWillUnmount() {
    console.log("💎💎💎💎💎 UNMOUNTED  💎💎💎💎💎 ");
    this.props.joinCodeClear();
  }

  render() {
    // decontruct all of the props stuff - or will this cause error
    // show modal for not found
    // this.props.join_code_not_found
    const {
      auth,
      authCustomClaim,
      mongoStudentData,
      join_code_found
    } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (this.state.returnToDash) return <Redirect to="/student" />;

    // TEMP
    // if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    const renderProblemWithInput = () => {
      return <div>lala</div>;
    };

    return (
      <div className="container">
        {this.state.modal_problemWithInput ? (
          <Modal
            mainText={"Oops!"}
            subtitle1={this.state.modal_problemWithInput_text}
            onModalClose={this.onModalClose.bind(this)}
          />
        ) : null}

        {this.state.showSpinner && !this.props.joinCode ? (
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
          <ModalWithButton
            mainText={`Teacher: ${this.props.joinCode.teacher_name}`}
            subtitle1={`Class: ${this.props.joinCode.class_description}`}
            buttonAction={this.confirmClassEnrollment.bind(this)}
            buttonText={"Click to confirm enrollment"}
            onModalClose={this.onModalClose.bind(this)}
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
    joinCodeCheck: joinCode => dispatch(joinCodeCheck(joinCode)),
    joinCodeClear: () => dispatch(joinCodeClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddClass);
