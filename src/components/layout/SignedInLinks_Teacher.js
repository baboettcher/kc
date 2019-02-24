import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks_Teacher = props => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/studentsall">StudentsT</NavLink>
        </li>
        <li>
          <NavLink to="/groupsall">GroupsT</NavLink>
        </li>
        <li>
          <NavLink to="/colleagues">ColleaguesT</NavLink>
        </li>
        <li>
          <NavLink to="/callonme">CallOnMeT</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">ScoreboardT</NavLink>
        </li>

        <li>
          <a onClick={props.signOut}>LogoutT</a>
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
