import React, { Component } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllDistricts,
  deleteDistrict
} from "../../store/actions/districtsActions";

class DistrictMasterList extends Component {
  state = {
    statusMessage: ""
  }; // add this later from redux for general updates

  componentDidMount() {
    this.props.getAllDistricts();
  }

  handleDelete(id) {
    this.props.deleteDistrict(id);
  }

  render() {
    const { auth } = this.props;
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

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div>
        <h2>Districts - SUPER</h2>
        <h6>{listOfDistricts}</h6>
        <button>
          <NavLink to="/super_add_district">Add New District</NavLink>
        </button>
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
    districts: state.districts,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DistrictMasterList);
