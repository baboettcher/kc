import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addDistrict } from "../../store/actions/districtsActions";

class DistrictAdd extends Component {
  state = {
    id: "",
    name: "",
    abbreviation: ""
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
              <input type="text" id="name" onChange={this.handleChange} />
              <label htmlFor="name">Name</label>
            </div>

            <div className="input-field">
              <input
                type="text"
                id="abbreviation"
                onChange={this.handleChange}
              />
              <label htmlFor="abbreviation">Abbreviation</label>
            </div>

            <div className="input-field">
              <input type="text" id="id" onChange={this.handleChange} />
              <label htmlFor="id">ID</label>
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
