import React, { Component } from "react";
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";

/* const items = [
  { key: 'editorials', active: true, name: 'Editorials' },
  { key: 'review', name: 'Reviews' },
  { key: 'events', name: 'Upcoming Events' },
]
 */

class SignedOutLinks extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => {
    this.setState({
      activeItem: name
    })
  }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          as={Link}
          to={"/signin"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='student'
          active={activeItem === 'student'}
          to="/signupstudent"
          as={Link}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='teacher'
          active={activeItem === 'teacher'}
          to="/signupteacher"
          as={Link}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='administrator'
          active={activeItem === 'administrator'}
          to="/signupadmin"
          as={Link}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }

};

export default SignedOutLinks;
