import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks_Teacher = props => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/studentsall">Students</NavLink>
        </li>
        <li>
          <NavLink to="/groupsall">Groups</NavLink>
        </li>
        <li>
          <NavLink to="/colleagues">Colleagues</NavLink>
        </li>
        <li>
          <NavLink to="/callonme">CallOnMe</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">Scoreboard</NavLink>
        </li>

        <li>
          <a onClick={props.signOut}>Logout</a>
        </li>

        <li>
          <NavLink to="/teacher" className="btn btn-floating pink lighten-1">
            TC
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
)(SignedInLinks_Teacher);
