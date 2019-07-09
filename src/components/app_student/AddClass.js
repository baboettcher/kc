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
import Spinner from "../common/spinner"; // change this to material-UI
// import { threadId } from "worker_threads"; _ WHERE is this coming from?
// import PropTypes from "prop-types";

class AddClass extends Component {
  state = {
    joinCodeInputted: "",
    modal_problemWithInput: false,
    modal_problemWithInput_text: "",

    modal_confirmClass: false,
    modal_confirmClass_main: "",
    modal_confirmClass_text: "",

    showSpinner: false,
    returnToDash: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // add more specific validation
    if (!this.state.joinCodeInputted) {
      this.setState({
        joinCodeInputted: "",
        modal_problemWithInput: true,
        modal_problemWithInput_text: "Please enter a valid code"
      });
    } else {
      this.setState({
        showSpinner: true,
        modal_confirmClass: true,
        modal_confirmClass_main: "test abcd", // use in modal
        modal_confirmClass_text: "test EFGH"
      });
      this.props.joinCodeCheck(this.state.joinCodeInputted);
    }
  };

  onModalClose_inputIssue() {
    this.setState({
      joinCode: "",
      modal_problemWithInput: false,
      modal_problemWithInput_main: "",
      modal_problemWithInput_text: "",
      modal_confirmClass: false, // remove?
      modal_confirmClass_main: "", // remove?
      modal_confirmClass_text: "", // remove?
      showSpinner: false,
      returnToDash: false
    });
  }

  onModalClose_finish() {
    this.setState({
      // joinCode: "",
      // modal_problemWithInput: false,
      // modal_problemWithInput_main: "",
      // modal_problemWithInput_text: "",
      // modal_confirmClass: false, // remove
      // modal_confirmClass_main: "", // remove
      // modal_confirmClass_text: "", // remove
      // showSpinner: false,
      returnToDash: true
    });
  }

  confirmClassEnrollment() {
    const { joinCode, mongoStudentData } = this.props;
    this.props.studentAddClassWithCode({ joinCode, mongoStudentData });
    this.setState({
      returnToDash: true
    });
  }

  componentWillUnmount() {
    console.log("💎💎💎💎💎 ADDCLASS UNMOUNTED  💎💎💎💎💎 ");
    this.props.joinCodeClear();
  }

  render() {
    const {
      auth,
      authCustomClaim,
      mongoStudentData,
      recentClassAdded,
      join_code_found
    } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (this.state.returnToDash) return <Redirect to="/student" />;
    /* 
    if (mongoStudentData) {
      console.log("mongoStudentData-->", mongoStudentData);
    }

    if (recentClassAdded) {
      console.log(
        "🛵🛵🛵🛵🛵 recentClassAddedBool 🛵🛵🛵🛵🛵",
        recentClassAdded
      );
      return <Redirect to="/student" />;
    }
 */
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
            onModalClose={this.onModalClose_inputIssue.bind(this)}
          />
        ) : null}

        {this.state.showSpinner && !this.props.joinCode ? (
          <Spinner />
        ) : (
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Enter a class code:</h5>
            <div className="input-field">
              <label htmlFor="joinCodeInputted">5-digit join code</label>
              <input
                type="text"
                id="joinCodeInputted"
                value={this.state.joinCodeInputted}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">Submit:</button>
            </div>
          </form>
        )}

        {this.props.joinCode && this.state.modal_confirmClass ? (
          <ModalWithButton
            mainText={`Teacher: ${this.props.joinCode.teacher_name}`}
            subtitle1={`Class: ${this.props.joinCode.class_description}`}
            buttonAction={this.confirmClassEnrollment.bind(this)}
            buttonText={"Click to confirm enrollment"}
            onModalClose={this.onModalClose_finish.bind(this)}
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
    recentClassAdded: state.student.recentClassAdded,
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
