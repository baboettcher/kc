import React, { Component } from "react";
import { Link } from "react-router-dom";
import SignedInLinksStudent from "./SignedInLinks_Student";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedInLinksSuper from "./SignedInLinks_Super";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
import { authCheck } from "../../store/actions/authActions";

class Navbar extends Component {
  state = {};

  render() {
    const { auth, authCustomClaim } = this.props;

    let links = <SignedOutLinks />;

    if (auth.uid) {
      if (authCustomClaim === "super") {
        links = <SignedInLinksSuper />;
      } else if (authCustomClaim === "teacher") {
        links = <SignedInLinksTeacher />;
      } else if (authCustomClaim === "student") {
        links = <SignedInLinksStudent />;
        // } else if (authCustomClaim === "administrator") {
        //   links = <SignedInLinksAdministrator />;
      }
    }

    console.log("auth.uid----->", auth.uid);
    console.log("authCustomClaim", authCustomClaim);

    //const links = auth.uid ? <SignedInLinksSuper /> : <SignedOutLinks />;

    return (
      <nav className="nav-wrapper grey darken-3">
        <div className="container">
          {/*         <Link to="/" className="brand-logo left">
           */}{" "}
          <Link to="/" className="left">
            {"sp/a/t/s"}
          </Link>
          {links}
        </div>
      </nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheck: user => dispatch(authCheck(user))
  };
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
