import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ListOfTeachers from "./ListOfTeachers";

/* const IndividualTeacher = props => {
  const { name } = props.schoolData;
  return <li>{name}</li>;
}; */

class ProfileSchool extends Component {
  state = {
    teachers: []
  };

  componentDidMount() {
    this.setState(() => {
      return {
        currentSchoolRecord: this.props.currentSchoolRecord
      };
    });
  }

  render() {
    const {
      name,
      principal,
      _id,
      student_mini_records,
      teacher_mini_records
    } = this.props.currentSchoolRecord;

    return (
      <div>
        <h1>{name}</h1>

        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.deleteSchool.bind(null, name, _id)}
        >
          DELETE {name}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log("TOGGLE")}
        >
          Toggle View Students / Teachers
        </Button>
        <h3>Principal: {principal}</h3>

        <ListOfTeachers
          teacher_mini_records={teacher_mini_records}
          currentSchoolRecord={this.props.currentSchoolRecord}
        />
        <h1> </h1>
        <h1> </h1>
      </div>
    );
  }
}

export default ProfileSchool;
