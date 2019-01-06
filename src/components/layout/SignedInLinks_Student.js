import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks_Teacher = () => {
  return (
    <ul className="right">
      <li>
        {" "}
        <NavLink to="/myroom">My Room</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/tradezone">Trade Zone</NavLink>
      </li>

      <li>
        <NavLink to="/">Log Out Student</NavLink>
      </li>
      <li>
        <NavLink to="/student" className="btn btn-floating pink lighten-1">
          ST
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedInLinks_Teacher;
