import React, { Component } from "react";
import { Menu } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { clearStudentOnSignout } from "../../store/actions/studentActions";

class SignedInLinks_Student2 extends Component {
  state = { activeItem: 'home' }

  fullSignOut() {
    this.props.firebaseSignOut();
    this.props.clearStudentOnSignout();
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }

  render() {
    const { activeItem } = this.state
    const { initials } = this.props;

    return (
      <Menu secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'kidcoins'}
          onClick={this.handleItemClick}
          as={Link}
          to={"/student"}
        >{initials}</Menu.Item>

        <Menu.Item
          name='myroom'
          active={activeItem === 'myroom'}
          onClick={this.handleItemClick}
          as={Link}
          to={"/myroom"}

        />
        <Menu.Item
          name='trade zone'
          active={activeItem === 'trade'}
          onClick={this.handleItemClick}
          as={Link}
          to={"/tradezone"}
        />
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.fullSignOut.bind(this)}
        />

        <Menu.Item
          name='kidcoins'
          active={activeItem === 'kidcoins'}
        />
      </Menu>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    firebaseSignOut: () => dispatch(signOut()),
    clearStudentOnSignout: () => dispatch(clearStudentOnSignout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks_Student2);

