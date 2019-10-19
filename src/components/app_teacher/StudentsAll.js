import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";
import SelectForm from "../common/selectForm";
import {
  setDefaultClass,
  increaseStudentCredit,
  refreshDefaultClass
} from "../../store/actions/teacherActions";
// import PropTypes from "prop-types";

class StudentsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentClass: "",
      teacherId: ""
    };
    this.selectDefaultClass = this.selectDefaultClass.bind(this);
    this.awardCredit = this.awardCredit.bind(this);
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

  awardCredit(studentObject, amountAwarded = 10) {
    console.log("studentObject._id:", studentObject._id);
    console.log("this.state.currentClass", this.state.currentClass);

    // 1 - update local state for ui
    const newCurrentClass = [];
    this.state.currentClass.forEach(student => {
      if (student._id === studentObject._id) {
        student.credits = student.credits + amountAwarded;
      }
      newCurrentClass.push(student);
    });

    this.setState({
      currentClass: newCurrentClass
    });

    // 2 - call action to update db
    this.props.increaseStudentCredit(studentObject._id, amountAwarded);
  }

  componentDidMount() {
    this.setState({
      currentClass: this.props.mongoTeacherData
        ? this.props.mongoTeacherData.default_class_students
        : "",
      teacherId: this.props.mongoTeacherData._id
    });
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.mongoTeacherData &&
      this.props.mongoTeacherData &&
      prevProps.mongoTeacherData.default_class_id !==
        this.props.mongoTeacherData.default_class_id
    ) {
      console.log("UPDATED NOTICED!");
      this.setState({
        currentClass: this.props.mongoTeacherData.default_class_students
      });
    }
  }

  componentWillUnmount() {
    if (this.state.teacherId) {
      this.props.refreshDefaultClass(this.state.teacherId);
    }
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    //if (!auth.uid) return <Redirect to="/signin" />;
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
      const divStyle = {
        color: "blue"
        // backgroundImage: 'url(' + imgUrl + ')',
      };

      /* (v1 - orig version from redux state)
    if (default_class_students && default_class_students.length > 0) {
        allCurrentStudents = default_class_students.map(student => {
          return (
            <li>
              <span onClick={() => this.loadStudentRecord(student.first_name)}>
                {student.first_name}{" "}
              </span>
              <span style={divStyle}> {student.credits}</span>
              <span onClick={() => this.awardCredit(student)}>💎</span>
            </li>
          );
        });
      } */

      //(v2- use local state rather than store/props state for quick UI update)
      if (this.state.currentClass && this.state.currentClass.length > 0) {
        allCurrentStudents = this.state.currentClass.map(student => {
          return (
            <li>
              <span onClick={() => this.loadStudentRecord(student.first_name)}>
                {student.first_name}{" "}
              </span>
              <span style={divStyle}> {student.credits}</span>
              <span onClick={() => this.awardCredit(student)}>💎</span>
            </li>
          );
        });
      }

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
    refreshDefaultClass: fb_uid => dispatch(refreshDefaultClass(fb_uid)),
    setDefaultClass: defaultClass => dispatch(setDefaultClass(defaultClass)), // FIX: second param is amount of credits
    increaseStudentCredit: (uid, amount) =>
      dispatch(increaseStudentCredit(uid, amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsAll);
