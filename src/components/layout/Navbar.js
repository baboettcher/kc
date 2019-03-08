import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinksStudent from "./SignedInLinks_Student";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedInLinksSuper from "./SignedInLinks_Super";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

class Navbar extends Component {
  state = {};

  render() {
    const { auth, authCustomClaim } = this.props;

    const displayName = auth.displayName ? auth.displayName : "no name";

    let links = <SignedOutLinks />;
    let userType = "";

    // if (auth.uid) {
    if (authCustomClaim === "super") {
      userType = "SUPER: " + displayName;
      links = <SignedInLinksSuper />;
    } else if (authCustomClaim === "teacher") {
      userType = "TEACHER: " + displayName;
      links = <SignedInLinksTeacher />;
    } else if (authCustomClaim === "student") {
      userType = "STUDENT " + displayName;
      links = <SignedInLinksStudent />;
      // } else if (authCustomClaim === "administrator") {
      //   links = <SignedInLinksAdministrator />;
    }
    // }

    console.log("auth.uid----->", auth.uid);
    console.log("authCustomClaim", authCustomClaim);

    //const links = auth.uid ? <SignedInLinksSuper /> : <SignedOutLinks />;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          {/*         <Link to="/" className="brand-logo left">
           */}{" "}
          <Link to="/" className="left">
            {userType}
          </Link>
          {links}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(mapStateToProps)(Navbar);
