import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SelectForm from "../common/selectForm";
import { setDefaultClass } from "../../store/actions/teacherActions";
//import PropTypes from "prop-types";

class StudentsAll extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   defaultClass: "nada todavia"
    // };
    this.selectDefaultClass = this.selectDefaultClass.bind(this);
  }
  //passed to select menu
  selectDefaultClass(classSelected) {
    // this.setState({
    //   defaultClass: classSelected
    // });
    this.props.setDefaultClass(classSelected); // set on store
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
        current_classes
      } = this.props.mongoTeacherData;

      return (
        <div className="container">
          <h5>Current Class {"coming"}</h5>
          <h5>Current students (depend on dropdown)</h5>
          <SelectForm
            menuItemsFull={current_classes ? current_classes : null}
            instructions={"Choose your default class"}
            selectResult={this.selectDefaultClass}
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
