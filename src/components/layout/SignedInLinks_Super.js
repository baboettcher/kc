import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks_Super = () => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/districtmasterlist">Districts</NavLink>
        </li>
        <li>
          <NavLink to="/schoolmasterlist">Schools</NavLink>
        </li>
        <li>
          <NavLink to="/teachermasterlist">Teachers</NavLink>
        </li>
        <li>
          <NavLink to="/studentmasterlist">Students</NavLink>
        </li>
        <li>
          <NavLink to="/">Logout Super</NavLink>
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

export default SignedInLinks_Super;
