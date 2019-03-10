import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks_Admin = props => {
  const { initials } = props;
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/studentsall">xStudents</NavLink>
        </li>
        <li>
          <NavLink to="/groupsall">xGroups</NavLink>
        </li>

        <li>
          <a onClick={props.signOut}>Logout</a>
        </li>

        <li>
          <NavLink to="/admin" className="btn btn-floating pink lighten-1">
            {initials}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks_Admin);
