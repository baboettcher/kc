import React from "react";
import Joi from "joi-browser"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { teacherAddClass } from "../../store/actions/teacherActions";
import generatePassword from "password-generator";
import Modal from "../common/modal";
import Form from "../common/form"
import './teacherStyles.css'


class ClassCreateForm extends Form {
  state = {
    data: {
      classDescription: "",
      gradeLevel: "",
      specialNotes: ""
    },
    errors: {},
    showModal: false,
    dropDownMenu: [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "1st" },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "2nd" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "3rd" },
      { _id: "5b41ca3eeb7f6fbccd471820", name: "4th - FOURTH" }
    ] // later load this from preset setting?
  }

  schema = {
    classDescription: Joi.string().required().label("Class Description"),
    specialNotes: Joi.string().allow(''),
    // gradeLevel: Joi.string().required().label("Grade Level"), // change to dropdown later
    gradeLevel: Joi.string().required().label("Grade Level") // change to dropdown later
  }


  // >>>> submit is not sending the correct PUT call <<<<<< 
  doSubmit() {
    const teacher_name = this.props.mongoTeacherData.first_name + " " + this.props.mongoTeacherData.last_name
    const teacher_id = this.props.mongoTeacherData._id;

    // select menu 
    const gradeLevelText = this.state.dropDownMenu.find(gradeLevel => gradeLevel._id === this.state.data.gradeLevel);

    // build object to send: #1 get teachID from props #2 merge new class info from state.data
    const newClassInfo = {
      grade_level: gradeLevelText.name,
      class_description: this.state.data.classDescription,
      special_notes: this.state.data.specialNotes,
      join_code: generatePassword(6),
      teacher_name,
      teacher_id
    };

    this.props.teacherAddClass([newClassInfo, teacher_id]);
    this.setState({
      showModal: true
    });
  }

  onModalClose() {
    this.setState(() => {
      return {
        data: {
          classDescription: "",
          gradeLevel: "",
          specialNotes: ""
        },
        showModal: false
      }
    })
    this.props.history.push("/teacher");
  }

  render() {
    const { auth, authCustomClaim, mongoTeacherData } = this.props;
    if (!auth.uid) return <Redirect to="/signin" />;

    // TEMP -- if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div className="container">
        {this.state.showModal ? (
          <Modal
            mainText={"ADDED:" + this.state.data.classDescription}
            subtitle1={this.state.data.specialNotes}
            onModalClose={this.onModalClose.bind(this)}
          />
        ) : null}

        <form onSubmit={this.handleSubmit}>
          <h1 className="grey-text text-darken-3">
            Create a New Class for
            {mongoTeacherData && mongoTeacherData.first_name
              ? mongoTeacherData.first_name
              : null}
            {mongoTeacherData && mongoTeacherData.last_name
              ? mongoTeacherData.last_name
              : null}
          </h1>
          <h2>
            {this.renderInput("classDescription", "Class Description")}
            {this.renderSelect("gradeLevel", "Grade Level", this.state.dropDownMenu)}
            {this.renderInput("specialNotes", "Special Notes")}
            {this.renderButton("Submit")}
          </h2>
        </form>

      </div >
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
)(ClassCreateForm);
