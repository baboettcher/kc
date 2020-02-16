import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
//import { superHeros } from "./assets/avatars/svg/superHeros"
import { superHeros } from "../../assets/avatars/svg/superHeros"

class RenderAvatar extends Component {

  render() {
    const { size } = this.props
    const { avatarId } = this.props
    return (
      <Container>
        <svg id="Capa_1"
          enable-background="new 0 0 512 512"
          height={size}
          width={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg">
          {superHeros[avatarId]}
        </svg>
      </Container>
    );
  }
}

export default RenderAvatar;


/*
<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
 */

