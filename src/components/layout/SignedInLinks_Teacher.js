import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks_Teacher = () => {
  return (
    <div>
      <ul className="right">
        <li>
          <NavLink to="/teacher">Dash</NavLink>
        </li>
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
          <NavLink to="/callonme">Call on Me</NavLink>
        </li>
        <li>
          <NavLink to="/scoreboard">Scoreboard</NavLink>
        </li>

        <li>
          <NavLink to="/">Log Out Teacher</NavLink>
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

export default SignedInLinks_Teacher;
