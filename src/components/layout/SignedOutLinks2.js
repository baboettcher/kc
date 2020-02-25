import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from 'semantic-ui-react'

/* const items = [
  { key: 'editorials', active: true, name: 'Editorials' },
  { key: 'review', name: 'Reviews' },
  { key: 'events', name: 'Upcoming Events' },
]
 */

class SignedOutLinks2 extends Component {
  state = { activeItem: 'home', page: 'home' }

  handleItemClick = (e, { name, page }) => {
    this.setState({
      activeItem: name,
      page
    })
  }

  render() {
    console.log("PROPS===>", this.props)
    const { activeItem } = this.state
    console.log("STUDENT LINK NEEDS TO MOVE TO ==>", this.state.page)

    return (
      <Menu secondary>
        <Menu.Item
          name='student'
          active={activeItem === 'student'}
          page="/signupstudent"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='teacher'
          active={activeItem === 'teacher'}
          page="/signupteacher"
          onClick={this.handleItemClick}

        />
        <Menu.Item
          name='administer'
          active={activeItem === 'administer'}
          page="/signupadmin"
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }



  /*     <ul className="right">
        <li>
          <NavLink to="/signupstudent">Student</NavLink>{" "}
        </li>
  
        <li>
          <NavLink to="/signupteacher">Teacher</NavLink>{" "}
        </li>
  
        <li>
          <NavLink to="/signupadmin">Administrator</NavLink>{" "}
        </li>
  
        <li>
          <NavLink to="/signupsuper">Super</NavLink>{" "}
        </li>
  
        <li>
          {" "}
          <NavLink to="/signin">Log In</NavLink>
        </li>
      </ul>
   */


};

export default SignedOutLinks2;
