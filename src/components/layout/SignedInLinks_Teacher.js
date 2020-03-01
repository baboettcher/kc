import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { clearTeacherOnSignout } from "../../store/actions/teacherActions";
import { Menu } from 'semantic-ui-react'

class SignedInLinks_Teacher extends Component {
  state = { activeItem: 'home' }

  fullSignOut() {
    this.props.firebaseSignOut();
    this.props.clearTeacherOnSignout();
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
        >{initials}</Menu.Item>

        <Menu.Item
          name='students'
          active={activeItem === 'students'}
          as={Link}
          to={"/studentsall"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='groups'
          active={activeItem === 'groups'}
          as={Link}
          to={"/groupthemesall"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='callonme'
          active={activeItem === 'callonme'}
          as={Link}
          to={"/callonme"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='callonme2'
          active={activeItem === 'callonme2'}
          as={Link}
          to={"/callonme2"}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          name='scoreboard'
          active={activeItem === 'scoreboard'}
          as={Link}
          to={"/scoreboard"}
          onClick={this.handleItemClick}
        />

        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.fullSignOut.bind(this)}
        />
      </Menu>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    firebaseSignOut: () => dispatch(signOut()), //firebase
    clearTeacherOnSignout: () => dispatch(clearTeacherOnSignout()) //firebase
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks_Teacher);

