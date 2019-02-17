import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/signup">Signup Super</NavLink>{" "}
      </li>
      <li>
        {" "}
        <NavLink to="/signin">Log In ANYONE</NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
