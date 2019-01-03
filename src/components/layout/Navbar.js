import React from "react";
import { Link } from "react-router-dom";
import SignedInLinksStudent from "./SignedInLinks_Student";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = props => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left">
          {props.name}
        </Link>
        <SignedInLinksStudent />
        <SignedInLinksTeacher />
        <SignedOutLinks />
      </div>
    </nav>
  );
};

export default Navbar;
