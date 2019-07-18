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
import Modal from "../common/modal";
import Spinner from "../common/spinner"; // change this to material-UI
// import PropTypes from "prop-types";

class AddClass extends Component {
  state = {
    joinCodeInputted: "",
    numberOfTries: 0,
    modal_problemWithInput: false,
    modal_problemWithInput_text: "",
    showSpinnerWhenChecking: false,
    returnToDash: false
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState((state, props) => {
      return {
        showSpinnerWhenChecking: true,
        numberOfTries: this.state.numberOfTries + 1
      };
    });

    this.props.joinCodeCheck(this.state.joinCodeInputted);
  };

  onModalClose_inputIssue() {
    this.setState({
      joinCodeInputted: "",
      modal_problemWithInput: false,
      modal_problemWithInput_text: "",
      showSpinnerWhenChecking: false,
      returnToDash: false
    });
  }

  onModalClose_finish() {
    this.setState({
      returnToDash: true
    });
  }

  // ++++++++  setState updates returnToDash which sends everything back
  // ++++++++ to the dashboard before the update has a chance to finish
  confirmClassEnrollment() {
    const { joinCode, mongoStudentData } = this.props;
    this.props.studentAddClassWithCode({ joinCode, mongoStudentData });
    // ++++++++  setState need to happen ATER the update
    // +++++++ should loading the dashboard be added to this action/??
    this.setState({
      returnToDash: true
    });
  }

  componentWillUnmount() {
    console.log("💎💎💎💎💎 ADDCLASS UNMOUNTED  💎💎💎💎💎 ");
    this.props.joinCodeClear();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.showSpinnerWhenChecking === true) {
      console.log("TURNING THE SPINNER OFF!");

      this.setState((state, props) => {
        return {
          showSpinnerWhenChecking: false,
          joinCodeInputted: ""
        };
      });
    }
  }

  render() {
    const {
      auth,
      authCustomClaim,
      mongoStudentData,
      recentClassAdded,
      joinCodeFound,
      joinCode
    } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    // TEMP: if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;
    if (this.state.returnToDash) return <Redirect to="/student" />;

    // joinCodeFound: null--> never been checked
    //                true--> stopSpinner
    //                false--> stopSpinner

    if (joinCode) {
      return (
        <div>
          {" "}
          <h2>joincode found!</h2>
          <ModalWithButton
            mainText={`Teacher: ${joinCode.teacher_name}`}
            subtitle1={`Class: ${joinCode.class_description}`}
            buttonAction={this.confirmClassEnrollment.bind(this)}
            buttonText={"Click to confirm enrollment"}
            onModalClose={this.onModalClose_finish.bind(this)}
          />
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
    joinCode: state.student.join_code,
    joinCodeFound: state.student.join_code_found
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

// return (
//   <div className="container">
//     <h2>Adding a class code:</h2>
//     {joinCode ? (
//       <div>

//           <div>
//             <h3>do not show spinner not checking</h3>
//             <Modal
//               mainText={"Oops!"}
//               subtitle1={"The code you entered seems to be invalid."}
//               onModalClose={this.onModalClose_inputIssue.bind(this)}
//             />
//           </div>

//         <Spinner />
