import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Modal from "../common/modal";

//import PropTypes from "prop-types";

class CallOnMe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };

    this.handleModalClick = this.handleModalClick.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
  }

  handleModalClick() {
    this.setState({
      showModal: true
    });
  }

  onModalClose() {
    this.setState({
      showModal: false
    });
  }

  render() {
    const { auth, authCustomClaim } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    return (
      <div>
        <h1 className="title">Call On Me</h1>
        <button onClick={this.handleModalClick.bind(this)}>
          Pick a student
        </button>
        {this.state.showModal ? (
          <Modal
            mainText="This is the big time"
            onModalClose={this.onModalClose}
            subtitle1="So buckle up for the ride!"
          />
        ) : null}
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

export default connect(mapStateToProps)(CallOnMe);
