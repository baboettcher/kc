import React, { Component } from "react";
import { Menu } from 'semantic-ui-react'
import { BrowserRouter as Router } from "react-router-dom";
/* import SignedInLinksStudent from "./SignedInLinks_Student"; */
import SignedInLinksStudent2 from "./SignedInLinks_Student2";
import SignedInLinksTeacher from "./SignedInLinks_Teacher";
import SignedInLinksSuper from "./SignedInLinks_Super";
import SignedInLinksAdmin from "./SignedInLinks_Admin";
import SignedOutLinks2 from "./SignedOutLinks2";
import SignedOutLinks1 from "./SignedOutLinks";
import { connect } from "react-redux";
//import { signOut } from "../../store/actions/authActions";



class Navbar2 extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
    console.log("handleCLIKC")
  }

  render() {

    const { auth, authCustomClaim } = this.props;
    const displayName = auth.displayName ? auth.displayName : "no name";
    let initials = displayName.split(" ")[0][0] + displayName.split(" ")[1][0];

    let links1 = <SignedOutLinks1 />;
    let links2 = <SignedOutLinks2 />;
    let userType = "SIGN-UP";
    let ifUserClicksOnName = "/signin";


    if (authCustomClaim === "super") {
      userType = "SUPER: " + displayName;
      links2 = <SignedInLinksSuper initials={initials} />;
      ifUserClicksOnName = "./super";
    } else if (authCustomClaim === "teacher") {
      userType = "TEACHER: " + displayName;
      links2 = <SignedInLinksTeacher initials={initials} />;
      ifUserClicksOnName = "./teacher";
    } else if (authCustomClaim === "student") {
      userType = "STUDENT " + displayName;
      links2 = <SignedInLinksStudent2 initials={initials} />;
      ifUserClicksOnName = "./student";
    } else if (authCustomClaim === "admin") {
      links2 = <SignedInLinksAdmin initials={initials} />;
      ifUserClicksOnName = "./admin";
    }


    return (<div>
      <Router>
        {/* {links1} */}
        {links2}
      </Router>

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
)(Navbar2);
