import React, { Component } from "react";
import SignedInLinksStudent from "./SignedInLinks_Student";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedInLinksAdmin from "./SignedInLinks_Admin";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";
//import { signOut } from "../../store/actions/authActions";

class Navbar extends Component {
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    const displayName = auth.displayName ? auth.displayName : "no name";
    let initials = displayName.split(" ")[0][0] + displayName.split(" ")[1][0];

    let links = <SignedOutLinks />;
    let userType = "SIGN-UP";
    let ifUserClicksOnName = "/signin";

    if (authCustomClaim === "teacher") {
      userType = "TEACHER: " + displayName;
      links = <SignedInLinksTeacher initials={initials} />;
      ifUserClicksOnName = "./teacher";
    } else if (authCustomClaim === "student") {
      userType = "STUDENT " + displayName;
      links = <SignedInLinksStudent initials={initials} />;
      ifUserClicksOnName = "./student";
    } else if (authCustomClaim === "admin") {
      links = <SignedInLinksAdmin initials={initials} />;
      ifUserClicksOnName = "./admin";
    }
    return (<div>
      {links}
    </div>
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


export default connect(
  mapStateToProps
)(Navbar);
