import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks_Teacher = () => {
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
          <NavLink to="/">LogOutT</NavLink>
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
