import React from "react";
import { Link } from "react-router-dom";
import SignedInLinksStudent from "./SignedInLinks_Student";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedInLinksSuper from "./SignedInLinks_Super";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const Navbar = props => {
  const { auth } = props;
  // console.log("AUTH", auth);
  // conditionally render links based on auth status
  const links = auth.uid ? <SignedInLinksSuper /> : <SignedOutLinks />;
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        {/*         <Link to="/" className="brand-logo left">
         */}{" "}
        <Link to="/" className="left">
          {"sp/a/t/s"}
        </Link>
        {/* <SignedInLinksStudent />
        <SignedInLinksTeacher /> */}
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = state => {
  console.log("UNTIL LOGGER IS FIXED===>>", state);
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
