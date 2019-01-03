import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <ul className="left">
          <li>
            <NavLink to="/">HOME</NavLink>
          </li>

          <li>
            <NavLink to="/superAdmin">SUPER</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/admin">ADMIN</NavLink>
          </li>

          <li>
            <NavLink to="/adminProtectedRoute">Admin Test</NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/todolist">ToDo</NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/players">Players</NavLink>
          </li>

          <li>
            {" "}
            <NavLink to="/teams">Tm</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
