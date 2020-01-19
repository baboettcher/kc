import React from "react";
import Joi from "joi-browser"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUpTeacher, signOut } from "../../store/actions/authActions";
import Form from "../common/form"


class SignUpTeacher extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      authLevel: "teacher",
      schoolName: "",
      currentStudents: [], // remove? // add new comp that dynamically loaded from preset
      currentClasses: []
    },
    errors: {}
  }

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    schoolName: Joi.string().allow(''),
    currentStudents: Joi.array().required().label("*** currentStudents hard-coded  []***"),
    currentClasses: Joi.array().required().label("*** currentClasses hard-coded  []***"),
    authLevel: Joi.string().required().label("*** AuthLevel hard-coded ***"),
  }


  handleSubmit = e => {
    e.preventDefault();
    // what about currentStudents and currentClasses?
    this.props.signUpTeacher(this.state.data);
    this.setState(() => {
      return {
        data: {
          email: "",
          password: "",
          firstName: "",
          lastName: "",
          authLevel: "teacher",
          schoolName: "",// optional now -- later get this is dynamic from database with all usa school
          currentClasses: [],
          currentStudents: []

        }
      }
    });
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    if (authCustomClaim === "teacher") {
      // ADD SUCCESS MESSAGE and please log back in
      console.log("TEACHER LOG-IN SUCCESSFUL");
      this.props.signOut();
      return <Redirect to="/signin" />;
    }

    return (
      <div>
        <h1>Teacher Signup Form 2</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First")}
          {this.renderInput("lastName", "Last")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("schoolName", "School Name - Optional")}
          {this.renderButton("Submit")}
        </form>
      </div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpTeacher: creds => dispatch(signUpTeacher(creds)),
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
)(SignUpTeacher
);
