import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signupteacher">Signup Teacher</NavLink>{" "}
      </li>
      <li>
        <NavLink to="/signupstudent">Signup Student</NavLink>{" "}
      </li>
      <li>
        <NavLink to="/signupsuper">Signup Super</NavLink>{" "}
      </li>
      <li>
        {" "}
        <NavLink to="/signin">Log In ANYONE</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
