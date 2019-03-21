import React, { Component } from "react";
import { Redirect, NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { teacherAddClass } from "../../store/actions/teacherActions";
import generatePassword from "password-generator";

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
    teacher_id: "" // set this in ??component did mount?
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();

    //console.log("===>>>", this.props.mongoTeacherData);

    this.props.mongoTeacherData.current_classes.push(this.state);
    console.log("updated===>", this.props.mongoTeacherData);
    this.props.teacherAddClass(this.props.mongoTeacherData);

    //this.props.addToCodeLookupList

    // clear state if successfull?
    this.setState(() => {
      return {
        classTitle: "",
        gradeLevel: "",
        specialNotes: "",
        joinPasscode: generatePassword(6),
        teacher_id: this.props.mongoTeacherData._id
      };
    });
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">
            Create a New Class for Mr's____
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
