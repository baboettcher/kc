import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class DistrictMasterList extends Component {
  state = {};
  render() {
    return (
      <div>
        <h2>Districts</h2>
        <h4>list to go here SUNDAY</h4>
        <h4>
          <NavLink to="/super_add_district">Add New District</NavLink>
        </h4>
      </div>
    );
  }
}

export default DistrictMasterList;
