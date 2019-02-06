import React from "react";
import { NavLink } from "react-router-dom";

const SignedInLinks_Teacher = () => {
  return (
    <ul className="right">
      <li>
        {" "}
        <NavLink to="/myroom">MyRoomS</NavLink>
      </li>

      <li>
        {" "}
        <NavLink to="/tradezone">TradeZoneS</NavLink>
      </li>

      <li>
        <NavLink to="/">LogOutS</NavLink>
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
