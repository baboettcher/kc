import React, { Component } from "react";
import _ from "lodash";

const OptionItem = props => {
  return <option value={props.schoolId}>{props.schoolName}</option>;
};

class AddSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      district_id: "",
      district_name: "",
      currentDistrictSelected: "",
      districtsForMenu: {},
      beginForm: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.triggerAddSchoolMenu = this.triggerAddSchoolMenu.bind(this);
  }

  triggerAddSchoolMenu() {
    this.setState(() => {
      return {
        beginForm: true
      };
    });
    console.log("addSchoolMenu");
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  // special onChange for dropdown field and name/id issue

  handleDropdownChange(event) {
    const nameOfField = event.target.name; // name == "district_id"
    const selectedDistrictId = event.target.value; // value == the id
    const { districtsForMenu } = this.props.districts;
    const selectedDistrict = _.find(districtsForMenu, {
      _id: selectedDistrictId
    });

    this.setState({
      [nameOfField]: selectedDistrictId,
      district_name: selectedDistrict.name
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // to update state. Change with Redux
    //this.props.getTeachers();

    const url = "/users/teacher";
    const data = this.state;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))

      // this is from TopLevelAdmin, just to refresh state. Move to REDUX later
      // later: allow multiple ads in a row
      .then(() => this.props.getTeachers())
      .then(() =>
        this.setState({
          first_name: "",
          last_name: "",
          school_id: "",
          school_name: ""
        })
      )
      .then(() => this.props.clearAddSchool())

      .catch(error => console.error("Entry invalid"));
  }

  render() {
    console.log("this.props-->", this.props);
    console.log("this.state-->", this.state);

    /*     const districtMenu = this.props.districtsForMenu.map(district => (
      <OptionItem
      key={district._id}
      districtId={district._id}
      districtName={district.name}
      />
      )); */

    return (
      <div>
        <button onClick={this.triggerAddSchoolMenu}>Add new school</button>

        {this.state.beginForm ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              Name
              <input
                name="first_name"
                type="text"
                data-first={this.state.dataFromSelect}
                value={this.state.first_name}
                onChange={this.handleChange}
              />
            </label>

            <label>
              Last:
              <input
                name="last_name"
                type="text"
                data-second="SECONDSECOND"
                value={this.state.last_name}
                onChange={this.handleChange}
              />
            </label>

            <label>
              <select name="school_id" onChange={this.handleDropdownChange}>
                <option selected value="no-choice">
                  Choose school
                </option>
                {/* schoolMenu */}
              </select>
            </label>

            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}
export default AddSchool;
