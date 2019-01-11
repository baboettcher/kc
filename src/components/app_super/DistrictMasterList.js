import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllDistricts,
  deleteDistrict
} from "../../store/actions/districtsActions";

class DistrictMasterList extends Component {
  state = {
    statusMessage: ""
  };

  componentDidMount() {
    this.props.getAllDistricts();
  }

  handleDelete(id) {
    this.props.deleteDistrict(id);
  }

  render() {
    const listOfDistricts = this.props.districts.length
      ? this.props.districts.map(district => {
          return (
            <li key={district._id}>
              {district.name_full}
              <span onClick={this.handleDelete.bind(this, district._id)}>
                {" "}
                X
              </span>
            </li>
          );
        })
      : null;

    return (
      <div>
        <h2>Districts</h2>
        <h6>{listOfDistricts}</h6>
        <h6>
          <NavLink to="/super_add_district">Add New District</NavLink>
        </h6>
        <h5>
          STATUS: {this.state.statusMessage ? this.state.statusMessage : null}
        </h5>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllDistricts: info => dispatch(getAllDistricts(info)),
    deleteDistrict: id => dispatch(deleteDistrict(id))
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
