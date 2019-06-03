import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SelectForm from "../common/selectForm";
//import PropTypes from "prop-types";

class StudentsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        current_students
      } = this.props.mongoTeacherData;

      return (
        <div className="container">
          <h5>Current Class Selected (make drop down)</h5>
          <h5>Current students (depend on dropdown)</h5>
          <SelectForm menuItems={["Homeroom", "ALD", "Golden Dragons"]} />
        </div>
      );
    } else {
      return (
        <div className="container">
          <h1>Loading</h1>
        </div>
      );
    }

    const currentStudents = this.props.mongoData
      ? this.props.mongoData.students
      : "not defined";
    console.log("currentStudents-->", currentStudents);

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

export default connect(mapStateToProps)(StudentsAll);
