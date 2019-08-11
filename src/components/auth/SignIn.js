import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn(this.state);
  };
  render() {
    const { authError, fb_auth, authCustomClaim } = this.props;
    console.log("SIGN-IN fb_auth--->", fb_auth);

    if (fb_auth.uid) {
      if (authCustomClaim === "super") {
        return <Redirect to="./super" />;
      } else if (authCustomClaim === "teacher") {
        return <Redirect to="./teacher" />;
      } else if (authCustomClaim === "student") {
        return <Redirect to="./student" />;
      } else if (authCustomClaim === "admin") {
        return <Redirect to="./admin" />;
      } else {
        console.log("NO CUSTOM CLAIM FOUND");
      }
    }

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h3 className="grey-text text-darken-3">Please sign In</h3>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Login</button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
        <h3>123456</h3>
        <h3>mrb@husd.us</h3>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: creds => dispatch(signIn(creds))
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    fb_auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
