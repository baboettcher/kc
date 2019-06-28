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
      defaultClass: "WTF"
    };
    this.selectDefaultClass = this.selectDefaultClass.bind(this);
  }

  // componentDidUpdate(oldProps) {
  //   const newProps = this.props;
  //   console.log("oldProps-->", oldProps);

  //   if (oldProps.mongoTeacherData !== newProps.mongoTeacherData) {
  //     this.setState({
  //       defaultClass: oldProps.mongoTeacherData.default_class
  //     });
  //   }
  // }

  //this is passed to selectForm
  selectDefaultClass(classSelected) {
    const { _id } = this.props.mongoTeacherData;
    const tempArray = [classSelected, _id];

    /// ------- ISSUE ------
    // WHY does the second argument "arrive" as undefined?
    // EX:
    // this.props.setDefaultClass(classSelected, _id)
    // DUCT-tape: put in an array:
    this.props.setDefaultClass(tempArray);
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
        default_class
      } = this.props.mongoTeacherData;

      return (
        <div className="container">
          <h3>Current Class (local state): {this.state.defaultClass}</h3>
          <h3>
            Current Class (redux state):{" "}
            {default_class ? default_class.class_description : null}
          </h3>
          <h5>Current students (depend on dropdown)</h5>
          <SelectForm
            menuItemsFull={current_classes ? current_classes : null}
            instructions={"Choose your default class"}
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
