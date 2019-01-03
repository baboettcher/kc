import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ProfileTeacher from "./ProfileTeacher";
import AddTeacher from "./AddTeacher";

class ListOfTeachers extends Component {
  state = {
    teachers: [],
    currentTeacherRecord: {},
    liveMessage: "",
    showAddTeacherButton: true,
    loadAddTeacher: false,
    showTeacherProfile: false
  };

  componentDidMount() {
    this.setState(() => {
      return {
        teachers: this.props.teacher_mini_records,
        liveMessage: ""
      };
    });
  }

  loadingMessage(text) {
    this.setState(() => {
      return {
        liveMessage: text
      };
    });
  }

  getTeacherRecord(_id, last_name) {
    this.setState({
      currentTeacherRecord: {},
      liveMessage: "LOADING " + last_name,
      showAddTeacherButton: false,
      showTeacherProfile: false
    });

    fetch("/users/teacher_record?id=" + _id)
      .then(teacher1 => teacher1.json())
      .then(teacher2 => {
        this.setState({
          currentTeacherRecord: teacher2,
          liveMessage: "",
          showAddTeacherButton: false,
          showTeacherProfile: true
        });
      })
      .catch(err => console.log("ERROR getting teacher record"));
  }

  removeTeacherFromSchool(first, last) {
    console.log("NEXT");
  }

  // (STRUCTURE 2: Double db call from server.
  // - cliente sends schoolid as param
  // - on body there are two properties
  // - 1)teacher_mini_records should be send from client WITH DELETION ALREADY MADE
  // - 2) teacher_id_to_delete: this is used in second db call to delete main teacher record
  //  (make additional db call to check that school updated properly?)

  deleteTeacherFromAllRecords(currentTeacherRecord) {
    console.log("currentTeacherRecord", currentTeacherRecord);
    const { first_name, last_name } = currentTeacherRecord;
    const { teacher_mini_records } = this.props;
    const {
      student_mini_records, // for later when student records as need to be updated
      school_uid,
      _id: teacher_id_to_delete
    } = currentTeacherRecord;

    this.loadingMessage("REMOVING " + first_name + " " + last_name);

    console.log(
      "Removing" +
        first_name +
        " " +
        last_name +
        " " +
        teacher_id_to_delete +
        " from schoolUuid: " +
        school_uid
    );

    const teacher_mini_records_new = teacher_mini_records.filter(
      teacherRecord => teacherRecord.uid !== teacher_id_to_delete
    );

    const url = "/users/delete_teacher_from_school/" + school_uid;
    const data = {
      teacher_id_to_delete,
      teacher_mini_records: teacher_mini_records_new
    };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(data => {
        console.log("success removing ", last_name, " from ", school_uid, data);
      })
      .then(() => {
        this.setState(() => {
          return {
            teachers: teacher_mini_records_new,
            currentTeacherRecord: {},
            liveMessage: "",
            showAddTeacherButton: true,
            showTeacherProfile: false,
            loadAddTeacher: false
          };
        });
      })
      .catch(err => {
        console.log("Put + Deleting error", err);
      });
  }

  /*     

  fetch("/users/delete_student_from_teacher/" + id, {
    method: "PUT"
  })
  .then(data => {
    console.log("success", data);
  })
  .catch(err => {
    console.log("Deleting error", err);
  });
} */

  /* 
// orginal delete
    fetch("/users/teacher2/" + id, {
      method: "DELETE"
    })
      .then(data => {
        console.log("success", data);
      })
      .catch(err => {
        console.log("Deleting error", err);
      });
  } */

  // orginal
  /* 
  deleteTeacher(first, last, id) {
    this.loadingMessage("DELETING " + first + " " + last);
    fetch("/users/teacher/" + id, {
      method: "DELETE"
    })
      .then(data => {
        console.log("success", first, last, data);
      })
      .then(() => {
        this.getTeachers(); // CHANGE: don't call again, just update state/redux
      })
      .then(() => {
        this.setState(() => {
          return {
            currentTeacherRecord: {},
            liveMessage: ""
          };
        });
      })
      .catch(err => {
        console.log("Deleting error", err);
      });
  }
 */

  //until r-router
  loadAddTeacher() {
    this.setState({
      loadAddTeacher: true,
      showAddTeacherButton: false
    });
  }

  clearAddTeacher(newTeacher) {
    this.setState(() => {
      return {
        loadAddTeacher: false,
        showAddTeacherButton: true
      };
    });

    if (newTeacher) {
      this.setState(() => {
        return {
          teachers: this.state.teachers.concat(newTeacher)
        };
      });
    }
  }

  render() {
    const newListOfTeachers = this.state.teachers
      ? this.state.teachers.map(teacher => {
          return (
            <li key={teacher._id}>
              <span
                onClick={this.getTeacherRecord.bind(
                  this,
                  teacher.uid,
                  teacher.last_name
                )}
              >
                {teacher.first_name} {teacher.last_name}
              </span>
            </li>
          );
        })
      : "No teachers in database";

    return (
      <div>
        {this.state.liveMessage ? <h2>{this.state.liveMessage}</h2> : null}
        {newListOfTeachers}

        {this.state.showTeacherProfile ? (
          <ProfileTeacher
            deleteTeacherFromAllRecords={this.deleteTeacherFromAllRecords.bind(
              this
            )}
            currentTeacherRecord={this.state.currentTeacherRecord}
            //teacher_mini_records={this.props.teacher_mini_records}
          />
        ) : null}

        {this.state.showAddTeacherButton ? (
          <div>
            {" "}
            <h2>{"\n"}</h2>
            <button onClick={this.loadAddTeacher.bind(this)}>
              {" "}
              Add Teacher
            </button>
          </div>
        ) : null}

        {this.state.loadAddTeacher ? (
          <AddTeacher
            currentSchoolRecord={this.props.currentSchoolRecord}
            clearAddTeacher={this.clearAddTeacher.bind(this)}
            loadingMessage={this.loadingMessage.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}

export default ListOfTeachers;
