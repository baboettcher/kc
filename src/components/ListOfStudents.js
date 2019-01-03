import React, { Component } from "react";
import ProfileStudent from "./ProfileStudent";
import AddNewTeacher from "./AddTeacher";

class ListOfStudents extends Component {
  state = {
    students: [],
    currentStudentRecord: {},
    liveMessage: ""
  };

  componentDidMount() {
    this.getStudents();
  }

  loadingMessage(text) {
    this.setState(() => {
      return {
        liveMessage: text
      };
    });
  }

  getStudents() {
    this.loadingMessage(
      "LOADING ALL " + this.props.currentDistrict + " STUDENTS"
    );

    // later add filter to this, by district, by teacher
    fetch("/users/all_students")
      .then(students1 => students1.json())
      .then(students2 => {
        this.setState({
          students: students2,
          liveMessage: ""
        });
      });
  }

  getStudentRecord(studentId, studentLastName) {
    this.loadingMessage("LOADING " + studentLastName);

    fetch("/users/student_record?id=" + studentId)
      .then(student1 => student1.json())
      .then(student2 => {
        this.setState({
          currentStudentRecord: student2,
          liveMessage: ""
        });
      });
  }

  deleteStudent(first, last, id) {
    this.loadingMessage("DELETING " + first + " " + last);

    fetch("/users/student/" + id, {
      method: "DELETE"
    })
      .then(data => {
        console.log("success", first, last, data);
      })
      .then(() => {
        this.getStudents(); // CHANGE: don't call again, just update state/redux
      })
      .then(() => {
        this.setState(() => {
          return {
            currentStudentRecord: {},
            liveMessage: ""
          };
        });
      })
      .catch(err => {
        console.log("Deleting error", err);
      });
  }

  render() {
    console.log("currentStudentRecord", this.state.currentStudentRecord);

    const newListOfStudents = this.state.students.map(student => {
      return (
        <li key={student._id}>
          <span
            onClick={this.getStudentRecord.bind(
              this,
              student._id,
              student.last_name
            )}
          >
            {student.first_name} {student.last_name}
          </span>
        </li>
      );
    });

    return (
      <div>
        {newListOfStudents}

        {this.state.currentStudentRecord.last_name ? (
          <ProfileStudent
            getStudents={this.getStudents.bind(this)}
            deleteStudent={this.deleteStudent.bind(this)}
            profileStudent={this.state.currentStudentRecord}
          />
        ) : null}
        {this.state.liveMessage ? <h3>{this.state.liveMessage}</h3> : null}

        {this.state.addTeacherFlag && (
          <AddNewStudent
            schoolsForMenu={this.state.schoolsForMenu}
            teachersForMenu={this.state.teachersForMenu}
            addNewStudent={this.addNewStudent.bind(this)}
            getStudents={this.getStudents.bind(this)}
          />
        )}
      </div>
    );
  }
}

export default ListOfStudents;
