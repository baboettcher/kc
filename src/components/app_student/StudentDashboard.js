import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class StudentDashboard extends Component {
  state = {
    addClassCode: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleAddCodeSubmit = e => {
    e.preventDefault();
    console.log("SUBMITTED CODE ", this.state.addClassCode);
    // this.props.signUpStudent(this.state);
    this.setState(() => {
      return {
        addClassCode: ""
      };
    });
  };

  render() {
    const { auth, authCustomClaim } = this.props;
    // if (!auth.uid) return <Redirect to="/signin" />;
    // Add to local storage? browser refreshing clears customclaim
    if (authCustomClaim !== "student") return <Redirect to="./signin" />;

    return (
      <div className="container">
        <h3 className="header text-center">Student Dashboard</h3>
        <div>
          {" "}
          <h5>Classes:</h5>
          <form className="white" onSubmit={this.handleAddCodeSubmit}>
            <div className="input-field">
              <label htmlFor="addClassCode">Enter class code to join:</label>
              <input
                type="text"
                id="addClassCode"
                value={this.state.addClassCode}
                onChange={this.handleChange}
              />
            </div>
            <div className="input-field">
              <button className="btn pink lighten-1 z-depth-0">
                Submit code
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim
  };
};

export default connect(mapStateToProps)(StudentDashboard);
