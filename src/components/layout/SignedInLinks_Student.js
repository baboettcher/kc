import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks_Student = props => {
  return (
    <ul className="right">
      <li>
        {" "}
        <NavLink to="/myroom">My Room</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/tradezone">Trade</NavLink>
      </li>

      <li>
        <a onClick={props.signOut}>Logout</a>
      </li>

      <li>
        <NavLink to="/student" className="btn btn-floating pink lighten-1">
          ST
        </NavLink>
      </li>
    </ul>
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
)(SignedInLinks_Student);
