import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAllDistricts } from "../../store/actions/districtsActions";

class DistrictMasterList extends Component {
  state = {};

  componentDidMount() {
    this.props.getAllDistricts();
  }

  render() {
    const listOfDistricts = this.props.districts.length
      ? this.props.districts.map(district => {
          return <li key={district._id}>{district.name_full}</li>;
        })
      : null;

    return (
      <div>
        <h2>Districts</h2>
        <h6>{listOfDistricts}</h6>
        <h6>
          <NavLink to="/super_add_district">Add New District</NavLink>
        </h6>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllDistricts: info => dispatch(getAllDistricts(info))
  };
};

const mapStateToProps = state => {
  return {
    districts: state.districts
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistrictMasterList);
