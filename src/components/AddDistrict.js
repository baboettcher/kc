import React, { Component } from "react";
import _ from "lodash";

const OptionItem = props => {
  return <option value={props.schoolId}>{props.schoolName}</option>;
};

class AddDistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name_full: "",
      name_initials: "",
      state: "",
      school_mini_records: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*   componentDidMount() {
    this.setState(() => {
      return {
        //school_uid: this.props.currentSchoolRecord._id,
        school_uid: this.props.currentSchoolRecord._id,
        school_name: this.props.currentSchoolRecord.name
      };
    });
  } */

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    // ADD SPINNER HERE / LOADING MESSAGE HERE

    const url = "/users/district";
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

      .then(() =>
        this.setState({
          name_full: "",
          name_initials: "",
          state: "",
          school_mini_records: []
        })
      )
      .then(() => {
        this.props.newDistrictAdded(data);
      })
      //  .then(() => this.props.clearAddDistrict())

      .catch(error => console.error("Entry invalid", error));
  }

  render() {
    return (
      <div>
        <h2>Add new district</h2>

        <form onSubmit={this.handleSubmit}>
          <label>
            Full Name:
            <input
              name="name_full"
              type="text"
              value={this.state.name_full}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Initials:
            <input
              name="name_initials"
              type="text"
              value={this.state.name_initials}
              onChange={this.handleChange}
            />
          </label>

          <label>
            State:
            <input
              name="state"
              type="text"
              value={this.state.state}
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
export default AddDistrict;
