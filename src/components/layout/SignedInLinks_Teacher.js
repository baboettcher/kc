import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
          name='students'
          active={activeItem === 'students'}
          onClick={this.handleItemClick}
          callback={() => console.log("students!")}
        />
        <Menu.Item
          name='groups'
          active={activeItem === 'groups'}
          onClick={this.handleItemClick}
          callback={() => console.log("groups!")}
        />
        <Menu.Item
          name='callonme'
          active={activeItem === 'callonme'}
          onClick={this.handleItemClick}
          callback={() => console.log("callonme!")}
        />
        <Menu.Item
          name='callonme2'
          active={activeItem === 'callonme2'}
          onClick={this.handleItemClick}
          callback={() => console.log("callonme2!")}
        />
        <Menu.Item
          name='scoreboard'
          active={activeItem === 'scoreboard'}
          onClick={this.handleItemClick}
          callback={() => console.log("scoreboard!")}
        />

        <Menu.Item
          name='logout'
          active={activeItem === 'logout'}
          onClick={this.fullSignOut.bind(this)}
          callback={() => true}
        />
      </Menu>

      /* 
            <div>
              <ul className="right">
                <li>
                  <NavLink to="/studentsall">Students</NavLink>
                </li>
                <li>
                  <NavLink to="/groupthemesall">Group Themes</NavLink>
                </li>
                <li>
                  <NavLink to="/colleagues">Colleagues</NavLink>
                </li>
                <li>
                  <NavLink to="/callonme">CallOnMe</NavLink>
                </li>
                <li>
                  <NavLink to="/callonme2">CallOnMe2</NavLink>
                </li>
                <li>
                  <NavLink to="/scoreboard">Scoreboard</NavLink>
                </li>
      
                <li>
                  <a onClick={this.fullSignOut.bind(this)}>Logout</a>
                </li>
      
                <li>
                  <NavLink to="/teacher" className="btn btn-floating pink lighten-1">
                    {initials}
                  </NavLink>
                </li>
              </ul>
            </div>
      
       */


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

