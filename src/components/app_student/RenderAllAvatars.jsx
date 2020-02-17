import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import { superHeros } from "../../assets/avatars/svg/superHeros"

class RenderAllAvatars extends Component {

  handleClick = (avatarId) => {
    this.props.handleAvatarSelection(avatarId)
  }


  render() {
    // avatarLibraryId-->later change avatar libraries
    const { avatarLibraryId, size } = this.props
    const avatarKeys = Object.keys(superHeros)
    const allAvatars = avatarKeys.map(avatar => {
      return (
        <svg id={avatar}
          onClick={() => this.handleClick(avatar)}
          enable-background="new 0 0 512 512"
          height={size}
          width={size}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg">>
        {superHeros[avatar]}
        </svg>
      )
    })
    return (<Container>
      {allAvatars}
    </Container>)
  }
}
export default RenderAllAvatars;



{/* <Container onClick={this.handleClick}>
<h1>HERE</h1>
<svg id="Capa_1"
  enable-background="new 0 0 512 512"
  height={size}
  width={size}
  viewBox="0 0 512 512"
  xmlns="http://www.w3.org/2000/svg">
  {superHeros["sup1"]}
</svg>
</Container> */}




/*
<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
 */

