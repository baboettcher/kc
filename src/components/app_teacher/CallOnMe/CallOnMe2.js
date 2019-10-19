import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CurrentStudentDetails from "./CurrentStudentDetails";
import SelectNewStudent from "./SelectNewStudent";
import "./App.css";

class CallOnMe2 extends Component {
  state = {
    currentStudent: {
      first: "",
      last: "",
      uid: ""
    },
    allowRepeats: true
  };

  componentDidMount() {
    this.setState({
      currentStudents: this.props.mongoTeacherData.default_class_students
    });
  }

  clearCounter() {
    console.log("CLEAR CALLED ");
  }

  repeatToggle() {
    console.log("REPEAT PRESSED");
    this.setState(() => {
      return {
        allowRepeats: !this.state.allowRepeats
      };
    });
  }

  setCurrentStudent(studentObject) {
    this.setState((prevState, props) => {
      return {
        currentStudent: studentObject
      };
    });
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
        <div className="App">
          <CurrentStudentDetails currentStudent={this.state.currentStudent} />
          <SelectNewStudent
            allCurrentStudents={default_class_students}
            setCurrentStudent={this.setCurrentStudent.bind(this)}
          />
          <button onClick={this.repeatToggle.bind(this)}>
            {this.state.allowRepeats ? "repeats okay" : "no repeats"}
          </button>
          {this.state.allowRepeats ? null : (
            <button onClick={this.clearCounter}>clear</button>
          )}
        </div>
      );
    } else {
      return <h1>loading</h1>;
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

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(CallOnMe2);