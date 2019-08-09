import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { clearTeacherOnSignout } from "../../store/actions/teacherActions";

class SignedInLinks_Teacher extends Component {
  fullSignOut() {
    this.props.firebaseSignOut();
    this.props.clearTeacherOnSignout();
  }

  render() {
    const { initials } = this.props;
    return (
      <div>
        <ul className="right">
          <li>
            <NavLink to="/studentsall">Students</NavLink>
          </li>
          <li>
            <NavLink to="/groupsall">Groups</NavLink>
          </li>
          <li>
            <NavLink to="/colleagues">Colleagues</NavLink>
          </li>
          <li>
            <NavLink to="/callonme">CallOnMe</NavLink>
          </li>
          <li>
            <NavLink to="/callonme2">CallOnMe2</NavLink>
          </li>
          <li>
            <NavLink to="/scoreboard">Scoreboard</NavLink>
          </li>

          <li>
            <a onClick={this.fullSignOut.bind(this)}>Logout</a>
          </li>

          <li>
            <NavLink to="/teacher" className="btn btn-floating pink lighten-1">
              {initials}
            </NavLink>
          </li>
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    firebaseSignOut: () => dispatch(signOut()), //firebase
    clearTeacherOnSignout: () => dispatch(clearTeacherOnSignout()) //firebase
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks_Teacher);
