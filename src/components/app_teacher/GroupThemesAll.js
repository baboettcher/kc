import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
//import PropTypes from "prop-types";

class GroupThemesAll extends Component {
  state = {
    data: {},
    errors: {}
  }


  render() {
    const { auth, authCustomClaim } = this.props;
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


    if (!default_class_id) {
      return <h1>PLease select a default class from 'Students' tab</h1>;
    }
    /*     const listOfGroupThemes =
      default_class_info &&
      default_class_info.group_themes.map(groupTheme => {
        return (
          <li key={groupTheme.id}>
            {groupTheme.name} {groupTheme.teacher_notes}
          </li>
        );
      }); */

    const listOfGroupThemes =
      default_class_info && default_class_info.group_themes.length ? (
        default_class_info.group_themes.map(groupTheme => {
          return (
            <li key={groupTheme.id}>
              {groupTheme.name} {groupTheme.teacher_notes}
            </li>
          );
        })
      ) : (
          <h2>Currently there are no group themes for this class</h2>
        );

    // --------------- NEXT NEXT NEXT!!!-----------
    //  -- Why is the math group not showing up?
    // We need to populated, yes?

    console.log("default_class_info", default_class_info);
    console.log(".group_themes", default_class_info.group_themes);

    return (
      <div>
        <h1 className="title">Current Group Themes for:{default_class_info.class_description}</h1>


        {/* // make this a table */}
        <h5>{listOfGroupThemes}</h5>

        <h5>
          <NavLink to="/groupthemesedit">Edit a Group Theme</NavLink>
        </h5>
        <h5>
          <NavLink to="/groupthemescreate">Add a Group Theme</NavLink>
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

export default connect(mapStateToProps)(GroupThemesAll);
