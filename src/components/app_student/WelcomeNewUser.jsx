import React, { Component } from 'react';
import RenderAllAvatars from './RenderAllAvatars'
import { Container } from 'semantic-ui-react'
import { updateStudentAvatar } from "../../store/actions/studentActions";
import { connect } from "react-redux";

import RenderAvatar from './RenderAvatar'


class WelcomeNewUser extends Component {
  state = {
    toDashboard: false,
    selectedAvatar: "",
    userData: {}
  }

  componentDidMount() {
    this.setState({
      userData: this.props.mongoStudentData
    })
  }

  handleAvatarSelection = (avatarId) => {
    console.log("handleAvatar")
    this.setState({ selectedAvatar: avatarId })

    // const someProperty = {...this.state.someProperty}
    // someProperty.flag = true;
    // this.setState({someProperty})
    //console.log("this.state.userData==>", this.state.userData)
    const updatedUserData = { ...this.state.userData }
    updatedUserData.avatarId = avatarId;

    this.setState({
      userData: { ...updatedUserData, },
      selectedAvatar: avatarId
    })

    console.log("updatedUserData-->", updatedUserData)

  }

  // or update the whole student?
  submitAvatar = () => {
    console.log("submitAvatar")
    // this.setState({
    //   userData: {
    //     avatarId: this.state.selectedAvatar
    //   }
    // })
    this.props.updateStudentAvatar(this.state.userData)
  }


  // THURS
  // add avatar modification props object
  // Make groups! (Withing Reading Group Theme)

  render() {
    console.log("STATE: ", this.state)
    return (<Container>
      <h1>Wecome! FIRST and LAST </h1>
      <h2>Choose an avatar!</h2>
      <RenderAllAvatars avatarLibraryId="001" size="50px" handleAvatarSelection={(av) => this.handleAvatarSelection(av)} />

      {this.state.selectedAvatar.length > 0
        ? <Container><RenderAvatar size="300" avatarId={this.state.selectedAvatar} />
          <button onClick={this.submitAvatar}>Make this ME!</button></Container>
        : null}

    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    fb_auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoStudentData: state.student.mongoData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateStudentAvatar: studentObj => dispatch(updateStudentAvatar(studentObj))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomeNewUser);

