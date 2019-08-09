import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Modal from "../common/modal";
// import { loadTeacherDashboard } from "../../store/actions/teacherActions";
//import PropTypes from "prop-types";

class CallOnMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      currentStudents: null,
      pickedStudent: null
    };

    this.handleModalClick = this.handleModalClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  handleModalClick() {
    this.setState({
      showModal: true,
      pickedStudent: this.pickRandomStudent()
    });
  }

  componentDidMount() {
    this.setState({
      currentStudents: this.props.mongoTeacherData.default_class_students
    });
  }

  onModalClose() {
    this.setState({
      showModal: false
    });
  }

  pickRandomStudent() {
    return this.state.currentStudents[
      _.random(0, this.state.currentStudents.length - 1)
    ];
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

    if (this.props.mongoTeacherData) {
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
              mainText={this.state.pickedStudent.first_name}
              onModalClose={this.onModalClose}
              subtitle1="message regarding topic"
            />
          ) : null}
        </div>
      );
    } else {
      return (
        <div>
          <h1>FIX THIS LATER!</h1>
          <Redirect to="/signin" />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoTeacherData: state.teacher.mongoData
  };
};

/* const mapDispatchToProps = dispatch => {
  return {
    loadTeacherDashboard: fb_uid => dispatch(loadTeacherDashboard(fb_uid))
  };
};
 */
export default connect(
  mapStateToProps
  // mapDispatchToProps
)(CallOnMe);
