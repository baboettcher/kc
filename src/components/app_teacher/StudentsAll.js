// NEXT: get student page to update immediately
// PLay with styles - Semantic UI

import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SelectForm from "../common/selectForm";
import { setDefaultClass } from "../../store/actions/teacherActions";
// import PropTypes from "prop-types";

class StudentsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultClass: ""
    };
    this.selectDefaultClass = this.selectDefaultClass.bind(this);
    this.loadStudentRecord = this.loadStudentRecord.bind(this);
    this.awardPoint = this.awardPoint.bind(this);
  }

  // this callback is passed to selectForm
  // "tempArray" is temporary workaround
  selectDefaultClass(classSelected) {
    const { _id: teacherId } = this.props.mongoTeacherData;
    const tempArray = [classSelected, teacherId];

    /// ------- ISSUE ------
    // WHY does the second argument "arrive" as undefined?
    // EX:
    // this.props.setDefaultClass(classSelected, _id)
    // DUCT-tape: put in an array:
    this.props.setDefaultClass(tempArray);
  }

  loadStudentRecord(studentObject) {
    console.log("LOAD PAGE:", studentObject);
  }

  awardPoint(studentObject) {
    console.log("POINT!:", studentObject);
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    if (this.props.mongoTeacherData) {
      const {
        // first_name,
        // last_name,
        // school_name,
        current_students,
        current_classes,
        default_class_id,
        default_class_info,
        default_class_students
      } = this.props.mongoTeacherData;

      let allCurrentStudents = "\nNo students to list.";

      if (default_class_students && default_class_students.length > 0) {
        allCurrentStudents = default_class_students.map(student => {
          return (
            <li>
              <span onClick={() => this.loadStudentRecord(student.first_name)}>
                {student.first_name}
              </span>
              <span onClick={() => this.awardPoint(student.first_name)}>
                💎
              </span>
            </li>
          );
        });
      }

      const divStyle = {
        color: "blue"
        // backgroundImage: 'url(' + imgUrl + ')',
      };

      return (
        <div className="container">
          <h3>
            {/* <span style="color:blue"> */}
            <div style={divStyle}>
              Current Class:{" "}
              {default_class_info ? default_class_info.class_description : null}
            </div>
            {allCurrentStudents}
            {/* {default_class_students ? allCurrentStudents : null} */}
            {default_class_students.length > 0
              ? "Number of tentative students: " + default_class_students.length
              : null}{" "}
          </h3>

          <SelectForm
            menuItemsFull={current_classes ? current_classes : null}
            instructions={"Choose your default class: "}
            selectDefaultClass={this.selectDefaultClass}
          />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Loading</h1>
        </div>
      );
    }

    return (
      <div>
        <h1 className="title">Current Students</h1>

        <li>
          <NavLink to="/studentsadd">Add A Student</NavLink>
        </li>
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
    setDefaultClass: defaultClass => dispatch(setDefaultClass(defaultClass))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsAll);
