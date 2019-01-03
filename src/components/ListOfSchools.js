import React, { Component } from "react";
import ProfileSchool from "./ProfileSchool";
import AddSchool from "./AddSchool";

class ListOfSchools extends Component {
  state = {
    schools: [],
    currentSchoolRecord: {},
    liveMessage: "",
    showAddSchoolButton: false,
    loadAddSchool: false
  };

  componentDidMount() {
    this.setState({
      schools: this.props.currentDistrictRecord.school_mini_records,
      liveMessage: ""
    });
  }

  loadingMessage(text) {
    this.setState(() => {
      return {
        liveMessage: text
      };
    });
  }

  getSchoolRecord(uid, name) {
    this.setState({
      currentSchoolRecord: "",
      liveMessage: "LOADING:" + name
    });

    fetch("/users/school_record_v2?_id=" + uid)
      .then(school1 => school1.json())
      .then(school2 => {
        this.setState({
          currentSchoolRecord: school2,
          liveMessage: ""
        });
      });
  }

  deleteSchool(name, id) {
    this.loadingMessage("DELETING: ", name);

    fetch("/users/school/" + id, {
      method: "DELETE"
    })
      .then(data => {
        console.log("success deleting", name, data);
      })
      .then(() => {
        this.getSchools();
      })
      .then(() => {
        this.setState(() => {
          return {
            currentSchoolRecord: {},
            liveMessage: ""
          };
        });
      })
      .catch(err => {
        console.log("Deleting error", err);
      });
  }

  loadAddSchool() {
    this.setState({
      loadAddSchool: true,
      showAddSchoolButton: false
    });
  }

  clearAddSchool() {
    this.setState({
      loadAddSchool: false,
      showAddSchoolButton: false
    });
  }

  render() {
    const newListOfSchools = this.state.schools.map(school => {
      return (
        <li key={school.uid}>
          <span
            onClick={this.getSchoolRecord.bind(this, school.uid, school.name)}
          >
            {school.name}
          </span>
        </li>
      );
    });

    return (
      <div>
        {newListOfSchools}

        {this.state.currentSchoolRecord &&
        this.state.currentSchoolRecord.name ? (
          <ProfileSchool
            deleteSchool={this.deleteSchool.bind(this)}
            currentSchoolRecord={this.state.currentSchoolRecord}
          />
        ) : null}

        {this.state.liveMessage ? <h3>{this.state.liveMessage}</h3> : null}

        {/* {this.state.showAddSchoolButton ? (
          <div>
            {" "}
            <h2>{"\n"}</h2>
            <button onClick={this.loadAddSchool.bind(this)}>
              {" "}
              Add a School
            </button>
          </div>
        ) : null} */}

        {this.state.loadAddSchool ? (
          <AddSchool
            clearAddSchool={this.clearAddSchool.bind(this)}
            loadingMessage={this.loadingMessage.bind(this)}
            school_mini_records={
              this.props.currentDistrictRecord.school_mini_records
            }
            districtsForMenu={this.props.districts}
          />
        ) : null}
      </div>
    );
  }
}

export default ListOfSchools;
