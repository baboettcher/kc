import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpTeacher } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignUpTeacher extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    authLevel: "teacher"
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpTeacher(this.state);
    console.log("sign up teacher submitted");
    this.setState(() => {
      return {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        authLevel: "teacher"
      };
    });
  };

  render() {
    const { auth, authCustomClaim } = this.props;

    //if (auth.uid) return <Redirect to="./teacher" />;
    if (authCustomClaim === "teacher") return <Redirect to="./teacher" />;

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up Teacher</h5>

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
            <button className="btn pink lighten-1 z-depth-0">
              Sign Up Teacher
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpTeacher: creds => dispatch(signUpTeacher(creds))
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
)(SignUpTeacher);
