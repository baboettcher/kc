import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//import PropTypes from "prop-types";

class GroupsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth, authCustomClaim, groups } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

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
    groups: state.groups,
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(mapStateToProps)(GroupsAll);
