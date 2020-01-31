import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Form from "../common/form"
import Modal from "../common/modal";
//import PropTypes from "prop-types";

export default class GroupThemesCreate extends Component {
  state = {
    data: {
      title: "",
      groupToAdd: "",
      allGroupsInTheme: [],
      miscNote1 ="",
      miscNote2 ="",
    },
    errors: {},
    groupsAvailableDropdown: [
      { _id: "5b21ca3eeb7f6fbccd471818", name: "Elms" },
      { _id: "5b21ca3eeb7f6fbccd471814", name: "Maples" },
      { _id: "5b21ca3eeb7f6fbccd471820", name: "Oaks" },
      { _id: "5b41ca3eeb7f6fbccd471820", name: "Ashes" }
    ]
  }
  schema = {
    title: Joi.string().required().label("Theme"),
    misc1Note: Joi.string().allow(''),
    misc2Note: Joi.string().allow('')
  }

  render() {
    return (
      <div>
        <h1 className="title">Create a New Group Theme</h1>
        <li>
          <NavLink to="/groupthemesall">All Group Themes</NavLink>
        </li>
      </div>
    );
  }
}
