import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signupstudent">Student</NavLink>{" "}
      </li>

      <li>
        <NavLink to="/signupteacher">Teacher</NavLink>{" "}
      </li>

      <li>
        <NavLink to="/signupadmin">Administrator</NavLink>{" "}
      </li>

      <li>
        <NavLink to="/signupsuper">Super</NavLink>{" "}
      </li>

      <li>
        {" "}
        <NavLink to="/signin">Log In</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
