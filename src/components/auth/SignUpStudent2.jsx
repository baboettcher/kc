import React from "react";
import Joi from "joi-browser"
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUpStudent, signOut } from "../../store/actions/authActions";
import Form from "../common/form"


class SignUpStudent extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      // classroomCode: "", // how to keep optional classroomCode and still pass validate?
      authLevel: "student"
    },
    errors: {}
  }

  schema = {
    // classroomCode: Joi.string(), // issue with required and still being a string
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    authLevel: Joi.string().required().label("*** AuthLevel hard-coded ***")
  }


  handleSubmit = e => {
    e.preventDefault();
    this.props.signUpStudent(this.state.data);
    this.setState(() => {
      return {
        data: {
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          classroomCode: "",
          authLevel: "student"
        }
      }
    });
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    if (authCustomClaim === "student") {
      // ADD SUCCESS MESSAGE and please log back in
      console.log("SUCCESS! NOW LOG IN");
      this.props.signOut();
      return <Redirect to="/signin" />;
    }

    return (
      <div>
        <h1>Student Signup Form 2</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First")}
          {this.renderInput("lastName", "Last")}
          {this.renderInput("email", "Email")}
          {this.renderInput("password", "Password", "password")}
          {/*  {this.renderInput("classroomCode", "Classroom Code")} */}
          {this.renderButton("Submit")}
        </form>
      </div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUpStudent: creds => dispatch(signUpStudent(creds)),
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
)(SignUpStudent);
