import React, { Component } from 'react';

class WelcomeNewUser extends Component {
  state = {
    toDashboard: false,
  }
  render() {
    return (<h1>
      Wecome! Please choose an icon
    </h1>);
  }
}

export default WelcomeNewUser;