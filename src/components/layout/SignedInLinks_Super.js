import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedInLinks_Super = props => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/districtmasterlist">DistrictsSP</NavLink>
        </li>
        <li>
          <NavLink to="/schoolmasterlist">SchoolsSP</NavLink>
        </li>
        <li>
          <NavLink to="/teachermasterlist">TeachersSP</NavLink>
        </li>
        <li>
          <NavLink to="/studentmasterlist">StudentsSP</NavLink>
        </li>
        <li>
          <a onClick={props.signOut}>LogoutSP</a>
        </li>
        <li>
          <NavLink to="/super" className="btn btn-floating pink lighten-1">
            SUP
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
)(SignedInLinks_Super);