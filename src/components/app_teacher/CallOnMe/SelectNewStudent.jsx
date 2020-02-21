import React, { Component } from "react";
import _ from "lodash";
import spinner from "./img/spinning-donut.gif";


class SelectNewStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      funnyTeacherStatement: "Teacher-made CALL ON ME ",
      nameHasBeenCalled: false,
      lastNumberCalled: null,
      allNumbersCalled: [],
      currentStudents: []
    };

    this.getRandomStudent = this.getRandomStudent.bind(this);
    this.clearSpinner = this.clearSpinner.bind(this);
    this.nameCalledStartSpinner = this.nameCalledStartSpinner.bind(this);
  }

  componentDidMount() {
    this.setState({
      currentStudents: this.props.allCurrentStudents
    });
  }

  getRandomStudent() {
    const ranNumber = _.random(0, this.state.currentStudents.length - 1);
    const newListOfStudents = this.state.allNumbersCalled.slice(0);
    newListOfStudents.push(ranNumber);

    // clear old name while spinner starts
    this.props.setCurrentStudent({
      first_name: "",
      last_name: "",
      uid: "",
      avatarId: ""
    });

    // add spinner (add on/off switch)
    if (true) {
      this.nameCalledStartSpinner();

      setTimeout(() => {
        // timer finished, so clear
        this.clearSpinner();
        // set new student
        this.props.setCurrentStudent(this.state.currentStudents[ranNumber]);
        // need to setState here? to keep track of all the available students?
        this.setState(() => {
          return {
            lastNumberCalled: ranNumber,
            allNumbersCalled: newListOfStudents
          };
        });
      }, 2000);
    }
  }

  clearSpinner() {
    console.log("SPINNER CLEARED");
    this.setState({
      nameHasBeenCalled: false
    });
  }

  nameCalledStartSpinner() {
    // need to add a slick transition to name that ends
    this.setState({
      nameHasBeenCalled: true
    });
  }

  render() {
    console.log("🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈🏳️‍🌈>>", this.state)
    return (
      <div>
        <div>
          {this.state.nameHasBeenCalled ? (
            <img src={spinner} width="400" height="300" />
          ) : (
              <button onClick={this.getRandomStudent}>
                {this.state.funnyTeacherStatement}
              </button>
            )}
        </div>
      </div>
    );
  }
}

export default SelectNewStudent;

//_.random([lower=0], [upper=1], [floating])
