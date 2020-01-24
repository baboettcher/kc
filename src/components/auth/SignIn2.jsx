import React from "react";
import Joi from "joi-browser"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../store/actions/authActions";
import Form from "../common/form"

class SignIn extends Form {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {}
  }

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    season: Joi.string()
      .required()
      .label("Season")
  }

  doSubmit = () => {
    this.props.signIn(this.state.data);
  }

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


      <div>
        <h1>Login Form 2</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderSelect("season", "Season", [
            { _id: "5b21ca3eeb7f6fbccd471818", name: "Summer" },
            { _id: "5b21ca3eeb7f6fbccd471814", name: "Fall" },
            { _id: "5b21ca3eeb7f6fbccd471820", name: "Winter" },
            { _id: "5b41ca3eeb7f6fbccd471820", name: "Spring" }
          ])}
          {this.renderButton("Submit")}
        </form>
      </div>)

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

