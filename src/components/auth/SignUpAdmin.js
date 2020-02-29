import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpAdmin, signOut } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignUpAdmin extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    school: "",
    district: "",
    state: "",
    authLevel: "admin"
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpAdmin(this.state);
    this.setState(() => {
      return {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        school: "",
        district: "",
        state: "",
        authLevel: "admin"
      };
    });
  };

  render() {
    const { auth, authCustomClaim } = this.props;

    if (authCustomClaim === "admin") {
      // ADD SUCCESS MESSAGE and please log back in
      console.log("SUCCESS! NOW LOG IN");
      this.props.signOut();
      return <Redirect to="/signin" />;
    }

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h1 className="grey-text text-darken-3">
            Sign Up School Administrator
          </h1>
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="school">School</label>
            <input
              type="text"
              id="school"
              value={this.state.school}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="lastName">District</label>
            <input
              type="text"
              id="district"
              value={this.state.district}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={this.state.state}
              onChange={this.handleChange}
            />
          </div>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">
              Sign Up Administrator
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpAdmin: creds => dispatch(signUpAdmin(creds)),
    signOut: () => dispatch(signOut())
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpAdmin);
