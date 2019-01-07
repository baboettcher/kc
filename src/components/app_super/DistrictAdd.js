import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addDistrict } from "../../store/actions/districtsActions";

class DistrictAdd extends Component {
  state = {
    name_full: "",
    name_initials: "",
    state: "",
    school_mini_records: []
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.addDistrict(this.state);
  };

  render() {
    return (
      <div>
        <div className="container">
          <form className="white" onSubmit={this.handleSubmit}>
            <h5 className="grey-text text-darken-3">Add District</h5>

            <div className="input-field">
              <input type="text" id="name_full" onChange={this.handleChange} />
              <label htmlFor="name_full">Full Name</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                id="name_initials"
                onChange={this.handleChange}
              />
              <label htmlFor="name_initials">Initials</label>
            </div>

            <div className="input-field">
              <input type="text" id="state" onChange={this.handleChange} />
              <label htmlFor="state">State</label>
            </div>

            <div className="input-field">
              <button className="btn pink lighten-1">Create</button>
            </div>
          </form>
        </div>

        <li>
          <NavLink to="/districtmasterlist">All Districts</NavLink>
        </li>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addDistrict: districtInfo => dispatch(addDistrict(districtInfo))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(DistrictAdd);
