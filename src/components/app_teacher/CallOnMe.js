import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Modal from "../common/modal";
import { loadTeacherDashboard } from "../../store/actions/teacherActions";
//import PropTypes from "prop-types";

class CallOnMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleModalClick = this.handleModalClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  handleModalClick() {
    this.setState({
      showModal: true
    });
  }

  onModalClose() {
    this.setState({
      showModal: false
    });
  }
  pickRandomStudent() {
    // pick
    // then add to modal
    // add point
  }

  addStudentPoint() {
    // create an action/reducder for this
    // update student model ---> POINTS and GROUPS
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    // Ready to render dashboard

    const {
      default_class_id,
      default_class_info,
      default_class_students,
      current_students
    } = this.props.mongoTeacherData;

    // console.log(default_class_info);
    // console.log(default_class_students);
    let allCurrentStudents = "\nNo students to list.";

    if (default_class_students && default_class_students.length > 0) {
      allCurrentStudents = default_class_students.map(student => {
        return <li>{student.first_name}</li>;
      });
    }

    return (
      <div>
        <h1 className="title">Call On Me!</h1>
        <h1>{default_class_info.class_description}</h1>
        <h3>{allCurrentStudents}</h3>

        <button onClick={this.handleModalClick.bind(this)}>
          Pick a student
        </button>
        {this.state.showModal ? (
          <Modal
            mainText="This is the big time"
            onModalClose={this.onModalClose}
            subtitle1="So buckle up for the ride!"
          />
        ) : null}
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
    loadTeacherDashboard: fb_uid => dispatch(loadTeacherDashboard(fb_uid))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CallOnMe);
