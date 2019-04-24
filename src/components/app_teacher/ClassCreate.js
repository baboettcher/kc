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
    classDescription: "",
    gradeLevel: "",
    specialNotes: "",
    joinPasscode: generatePassword(6),
    showModal: false // sliced before push to class array
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  // >>>> submit is not sending the correct PUT call <<<<<<
  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.gradeLevel || !this.state.classDescription) {
      this.setState({
        classDescription: "",
        gradeLevel: "",
        specialNotes: "",
        showModal: false
      });
    } else {
      const teacher_id = this.props.mongoTeacherData._id;
      const newClassInfo = {
        grade_level: this.state.gradeLevel,
        class_description: this.state.classDescription,
        teacher_name:
          this.props.mongoTeacherData.first_name +
          " " +
          this.props.mongoTeacherData.last_name, // added
        special_notes: this.state.specialNotes,
        add_code: generatePassword(6),
        teacher_id
      };
      this.props.teacherAddClass([newClassInfo, teacher_id]);

      this.setState(() => {
        return {
          showModal: true // NEW
        };
      });
    }
  };

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
          <h5 className="grey-text text-darken-3">
            Create a New Class for
            {mongoTeacherData && mongoTeacherData.first_name
              ? mongoTeacherData.first_name
              : null}
            {mongoTeacherData && mongoTeacherData.last_name
              ? mongoTeacherData.last_name
              : null}
          </h5>

          <div className="input-field">
            <label htmlFor="classDescription">Description of this class</label>
            <input
              type="text"
              id="classDescription"
              value={this.state.classDescription}
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
    teacherAddClass: (newClassInfo, teacherId) =>
      dispatch(teacherAddClass(newClassInfo, teacherId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassCreate);
