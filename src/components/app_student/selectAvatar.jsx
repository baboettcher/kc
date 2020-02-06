import React, { Component } from 'react';
import TeamLogo from '../TeamLogo'
import TestAnimal from '../testAnimal.js'

// ICON REFERENCE
// LUNCH - RANDOMY PIC
/* 
<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
 */


class selectAvator extends Component {
  state = {}
  render() {
    return (<div>
      <h1>hi</h1>

      {/* <svg x="0px" y="0px" viewBox="0 0 125.397 125.397">
      {logos[props.id]}
      
    </svg> */}
      <TestAnimal id={"koalas"} />
      <TestAnimal id={"koalas"} />
    </div>);
  }
}

export default selectAvator;