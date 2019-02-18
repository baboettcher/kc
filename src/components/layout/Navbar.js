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
  componentDidMount() {}
  render() {
    const { auth } = this.props;
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authCheck: user => dispatch(authCheck(user))
  };
};

const mapStateToProps = state => {
  console.log("STATE", state);
  //console.log("STATE.FB in NAVBAR===>>", state.firebase);
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
