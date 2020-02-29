import React, { Component } from "react";
import { Menu } from 'semantic-ui-react'
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { clearStudentOnSignout } from "../../store/actions/studentActions";

class SignedInLinks_Student2 extends Component {
  state = { activeItem: 'home' }

  fullSignOut() {
    this.props.firebaseSignOut();
    this.props.clearStudentOnSignout();
  }

  handleItemClick = (e, { name, callback }) => {
    this.setState({ activeItem: name })
    console.log("e.target--->", e.target)
    callback()
  }

  render() {
    const { activeItem } = this.state
    const { initials } = this.props;

    return (
      <Menu secondary>
        <Menu.Item
          name='home'
        >{initials}</Menu.Item>

        <Menu.Item
          name='kidcoins'
          active={activeItem === 'kidcoins'}
          onClick={this.handleItemClick}
          callback={() => console.log("kidcoins!")}
        />
        <Menu.Item
          name='myroom'
          active={activeItem === 'myroom'}
          onClick={this.handleItemClick}
          callback={() => console.log("myRoom!")}
        />
        <Menu.Item
          name='trade'
          active={activeItem === 'trade'}
          onClick={this.handleItemClick}
          callback={() => console.log("trade!")}
        />
        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.fullSignOut.bind(this)}
          callback={() => true}
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

