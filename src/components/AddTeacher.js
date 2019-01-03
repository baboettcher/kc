import React, { Component } from "react";
import _ from "lodash";

const OptionItem = props => {
  return <option value={props.schoolId}>{props.schoolName}</option>;
};

class AddTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      school_uid: "",
      school_name: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState(() => {
      return {
        //school_uid: this.props.currentSchoolRecord._id,
        school_uid: this.props.currentSchoolRecord._id,
        school_name: this.props.currentSchoolRecord.name
      };
    });
  }
  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const url = "/users/teacher_2";
    const data = this.state;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))

      .then(() => this.props.clearAddTeacher(this.state))

      .then(() =>
        this.setState(() => {
          return {
            first_name: "",
            last_name: "",
            school_uid: "",
            school_name: ""
          };
        })
      )

      .catch(error => console.error("Entry invalid", error));
  }

  render() {
    const { currentSchoolRecord } = this.props;
    console.log("currentSchoolRecord-->", currentSchoolRecord);
    console.log("state", this.state);
    return (
      <div>
        <h2>Create new teacher and add to {currentSchoolRecord.name}</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            First:
            <input
              name="first_name"
              type="text"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Last:
            <input
              name="last_name"
              type="text"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </label>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
export default AddTeacher;
