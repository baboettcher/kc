import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { teacherAddClass } from "../../store/actions/teacherActions";
import generatePassword from "password-generator";
import Modal from "../common/modal";

//import PropTypes from "prop-types";

// Two purposes
// 1) Save short version to teacher "classes" array
// 2) Save to "quick lookup table" so when students register using this code, they can see teacher name/ special message beofre joining
class ClassCreate extends Component {
  state = {
    classTitle: "",
    gradeLevel: "",
    specialNotes: "",
    joinPasscode: generatePassword(6),
    showModal: false
    //teacher_id: "" // set this in ??component did mount?
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const partOfStateToSend = {
      classTitle: this.state.classTitle,
      gradeLevel: this.state.gradeLevel,
      specialNotes: this.state.specialNotes,
      classTitle: this.state.classTitle,
      joinPasscode: generatePassword(6), // added
      teacher_id: this.props.mongoTeacherData._id // added
    };
    // push new class onto classes array of teacher
    this.props.mongoTeacherData.current_classes.push(partOfStateToSend);
    this.props.teacherAddClass(this.props.mongoTeacherData);

    // NEXT: add teacher ID for codeLookUp database

    this.setState(() => {
      return {
        showModal: true // NEW
        // joinPasscode: generatePassword(6)
        // teacher_id: this.props.mongoTeacherData._id
      };
    });
  };

  // REDIR#ECT BACK TO THE DASH BOARD

  onModalClose() {
    this.setState({
      showModal: false,
      returnToDash: true,
      classTitle: "",
      gradeLevel: "",
      specialNotes: ""

      // joinPasscode: generatePassword(6)
      // teacher_id: this.props.mongoTeacherData._id
    });
  }

  render() {
    const { auth, authCustomClaim, mongoTeacherData } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    if (this.state.returnToDash) return <Redirect to="/teacher" />;

    // TEMP
    // if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    console.log("mongoTeacherData", mongoTeacherData);
    return (
      <div className="container">
        {this.state.showModal ? (
          <Modal
            mainText={"ADDED:" + this.state.classTitle}
            subtitle1={this.state.specialNotes}
            onModalClose={this.onModalClose.bind(this)}
          />
        ) : null}

        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">
            Create a New Class for {mongoTeacherData.first_name}{" "}
            {mongoTeacherData.last_name}
          </h5>

          <div className="input-field">
            <label htmlFor="classTitle">Title of this class</label>
            <input
              type="text"
              id="classTitle"
              value={this.state.classTitle}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="gradeLevel">Grade Level</label>
            <input
              type="text"
              id="gradeLevel"
              value={this.state.gradeLevel}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="specialNotes">Special Notes:</label>
            <input
              type="text"
              id="specialNotes"
              value={this.state.specialNotes}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Create Class
            </button>
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
    mongoTeacherData: state.teacher.mongoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    teacherAddClass: newClassObject => dispatch(teacherAddClass(newClassObject))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassCreate);
