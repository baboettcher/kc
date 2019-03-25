import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { clearStudentOnSignout } from "../../store/actions/studentActions";

class SignedInLinks_Student extends Component {
  fullSignOut() {
    this.props.firebaseSignOut();
    this.props.clearStudentOnSignout();
  }

  render() {
    const { initials } = this.props;

    return (
      <ul className="right">
        <li>
          {" "}
          <NavLink to="/myroom">My Room</NavLink>
        </li>

        <li>
          {" "}
          <NavLink to="/tradezone">Trade</NavLink>
        </li>

        <li>
          <a onClick={this.fullSignOut.bind(this)}>Logout</a>
        </li>

        <li>
          <NavLink to="/student" className="btn btn-floating pink lighten-1">
            {initials}
          </NavLink>
        </li>
      </ul>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    firebaseSignOut: () => dispatch(signOut()),
    clearStudentOnSignout: () => dispatch(clearStudentOnSignout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks_Student);
