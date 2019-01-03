import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

const IndividualStudent = props => {
  const { last_name, first_name } = props.student;
  return (
    <li>
      {first_name} {last_name}
    </li>
  );
};

class ProfileTeacher extends Component {
  state = {
    open: false,
    showGroups: false,
    liveMessage: "",
    monsters: ""
  };

  componentDidMount() {
    // but this is allow happening in the rootReducer..?
    fetch("/users/all_monsters")
      .then(monsters1 => monsters1.json())
      .then(monsters2 => {
        // console.log("monsters2", monsters2);
        this.setState({
          monsters: monsters2
        });
      });
  }

  loadingMessage(text) {
    this.setState(() => {
      return {
        liveMessage: text
      };
    });
  }

  showAllGroups() {
    console.log("showTeacherGroups");
  }

  testIncrement() {
    console.log("UPUPUP");
  }

  render() {
    console.log(
      "==========PROFILE PROPS CURRENT TEACHER RECORD===>>>>",
      this.props.currentTeacherRecord
    );
    const {
      first_name,
      last_name,
      student_mini_records,
      _id
    } = this.props.currentTeacherRecord;

    const listOfStudents = student_mini_records
      ? student_mini_records.map(individualStudent => {
          return (
            <IndividualStudent
              key={individualStudent.uid}
              student={individualStudent}
            />
          );
        })
      : null;

    return (
      <div>
        <h3>
          Teacher Profile: {first_name} {last_name}{" "}
        </h3>

        {listOfStudents}

        <Button
          variant="contained"
          color="secondary"
          onClick={this.props.deleteTeacherFromAllRecords.bind(
            this,
            this.props.currentTeacherRecord
          )}
        >
          COMPLETELY DELETE {first_name}
          {last_name}
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            console.log("REMOVE FROM SCHOOL");
          }}
        >
          Remove {first_name}
          {last_name} from SCHOOL
        </Button>

        {/* { this.state.monsters
          ? this.state.monsters.map(monster => (
              <li key={monster._id}>
                {monster.name}{" "}
                <span onClick={this.testIncrement.bind(this, monster._id)}>
                  +
                </span>{" "}
                <span
                  onClick={this.props.deleteMonsterFromStore.bind(
                    this,
                    monster._id
                  )}
                >
                  DEL
                </span>
              </li>
            ))
          : null } */}

        {/*   

(
           onClick={this.testIncrement.bind(this)}
            no monsters{" "}
            <span onClick={this.buttonToDeleteMonster.bind(this)}>DEL</span>
          </h1>
        )


        {student_mini_records.length > 0 ? (
          <p>{student_mini_records.length} students</p>
        ) : (
          <p> No students</p>
        )
      
      {listOfStudents} */}
      </div>
    );
  }
}

// taking the state from the store and adding it to props
// or could I just use it from state?
const mapStateToProps = (state, ownProps) => {
  return {
    districtTest: state.districtTest,
    theTestItem: state.districtTest[0]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteMonsterFromStore: id => {
      dispatch({ type: "DELETE_MONSTER", id: id });
    } // function that takes the paraameter that is wanted
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileTeacher);
