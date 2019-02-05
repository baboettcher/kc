import React from "react";
import { Link } from "react-router-dom";
import SignedInLinksStudent from "./SignedInLinks_Student";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedInLinksSuper from "./SignedInLinks_Super";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link to="/" className="brand-logo left">
          {props.name}
        </Link>
        <SignedInLinksStudent />
        <SignedInLinksTeacher />
        <SignedInLinksSuper />
        <SignedOutLinks />
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  console.log("--->", state);
  // what we want attached to props
  return {};
};

export default connect(mapStateToProps)(Navbar);
