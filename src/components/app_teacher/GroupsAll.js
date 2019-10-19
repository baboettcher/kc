import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//import PropTypes from "prop-types";

class GroupsAll extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { auth, authCustomClaim, groups } = this.props;
    // temp guard until local storage
    if (!auth.uid) return <Redirect to="/signin" />;
    if (authCustomClaim !== "teacher") return <Redirect to="/signin" />;

    if (!this.props.mongoTeacherData) {
      return <h1>No teacher data</h1>;
    }

    const {
      // first_name,
      // last_name,
      // school_name,
      current_students,
      current_classes,
      default_class_id,
      default_class_info,
      default_class_students
    } = this.props.mongoTeacherData;

    // CompDidMount --> retrieve list of groups based on default_class_info/id

    if (!default_class_id) {
      return <h1>PLease select a default class from 'Students' tab</h1>;
    }

    const listOfGroups =
      groups.current &&
      groups.current.map(group => {
        return (
          <li key={group.id}>
            {group.name} has {group.members} members
          </li>
        );
      });

    return (
      <div>
        <h1 className="title">
          All groups for:{default_class_info.class_description}
        </h1>

        <h5>{listOfGroups}</h5>

        <h5>
          <NavLink to="/groupsedit">Edit a Group</NavLink>
        </h5>
        <h5>
          <NavLink to="/groupscreate">Add a Group</NavLink>
        </h5>
        <button>QUICK GROUP</button>
        <button>Size of group</button>
        <button>Balance by gender TOGGLE</button>
        <button>Heterogenious by MATH/ENGLISH/SETTING</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authCustomClaim: state.auth.authCustomClaim,
    mongoTeacherData: state.teacher.mongoData,
    groups: state.groups
  };
};

export default connect(mapStateToProps)(GroupsAll);
