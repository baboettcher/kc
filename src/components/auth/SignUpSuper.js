import React, { Component } from "react";
import { connect } from "react-redux";
import { signUpSuper } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignUpSuper extends Component {
  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    authLevel: "super"
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpSuper(this.state);
  };

  render() {
    const { auth, authCustomClaim } = this.props; // later this must check state.auth for custom claim of super
    //console.log("super auth---->>>>>", auth);

    if (authCustomClaim === "super") return <Redirect to="./super" />;

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up Super</h5>

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
              Sign Up Super
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpSuper: creds => dispatch(signUpSuper(creds))
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
)(SignUpSuper);
