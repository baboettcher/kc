import React, { Component } from 'react';
import RenderAllAvatars from './RenderAllAvatars'
import { Container } from 'semantic-ui-react'
import RenderAvatar from './RenderAvatar'


class WelcomeNewUser extends Component {
  state = {
    toDashboard: false,
    selectedAvatar: ""
  }
  handleAvatarSelection = (avatarId) => {
    this.setState({
      selectedAvatar: avatarId
    })
  }

  // MON:
  // finish CHOOSE selection and send back to dashboard
  // save update!
  // add avatar modification props object
  // Make groups! (Withing Reading Group Theme)

  render() {
    console.log(this.state.selectedAvatar)
    return (<Container>

      <h1>Wecome! FIRST and LAST </h1>
      <h2>Please choose an icon.</h2>

      <RenderAllAvatars avatarLibraryId="001" size="50px" handleAvatarSelection={(av) => this.handleAvatarSelection(av)} />
      {this.state.selectedAvatar.length > 0
        ? <Container><RenderAvatar size="300" avatarId={this.state.selectedAvatar} />
          <button >CHOOSE</button></Container>
        : null}

    </Container>)
  }
}

export default WelcomeNewUser;
