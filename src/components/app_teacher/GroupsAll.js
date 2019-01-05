import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
//import PropTypes from "prop-types";

class GroupsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { groups } = this.props;

    const listOfGroups =
      groups.current &&
      groups.current.map(group => {
        return (
          <li key={group.id}>
            {group.name} has {group.members} members
          </li>
        );
      });

    return (
      <div>
        <h1 className="title">All Groups</h1>
        <h5>{listOfGroups}</h5>

        <h5>
          <NavLink to="/groupsedit">Edit a Group</NavLink>
        </h5>
        <h5>
          <NavLink to="/groupscreate">Add a Group</NavLink>
        </h5>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    groups: state.groups
  };
};

export default connect(mapStateToProps)(GroupsAll);
