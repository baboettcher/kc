import React, { Component } from "react";
import _ from "lodash";
import { createStore } from "redux";
import AddDistrict from "./AddDistrict";

//import PropTypes from "prop-types";

import ListOfSchools from "./ListOfSchools";
import ListOfTeachers from "./ListOfTeachers";
//import ListOfStudents from "./ListOfStudents";

const OptionItem = props => {
  return <option value={props.districtId}>{props.districtName}</option>;
};

export default class TopLevelAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      districts: [],
      schools: [],
      teachers: [],
      students: [],
      loadSchoolsList: false,
      currentDistrictRecord: {},

      districtSelectedOnDropdown: {}, // for drop down only
      showDistrictDropdown: true,

      showAddDistrictButton: true,
      loadAddDistrictComponent: false,

      showChooseDistrict: true
    };

    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadAddDistrict = this.loadAddDistrict.bind(this);
    this.newDistrictAdded = this.newDistrictAdded.bind(this);
  }

  componentDidMount() {
    fetch("/users/all_districts")
      .then(districts1 => districts1.json())
      .then(districts2 => {
        this.setState({
          districts: districts2
        });
      })
      .catch(err => {
        console.log("Error on initial load", err);
      });
    /* 
    // ---------- REDUX PLAYGROUND --------------------//
    // --------- MOVE LARER TO REDUX IN 5 MINUTES ------ //

    // reducer takes state(of store) and action


    const initialState = {
      todos: [],
      posts: [],
      users: []
    };

    // REDUCER
    function myreducer(state = initialState, action) {
      if (action.type === "ADD_TODO") {
        return {
          ...state,
          todos: [...state.todos, action.todo]
        };
      } else if (action.type === "ADD_POST") {
        return {
          ...state,
          posts: [...state.posts, action.post]
        };
      } else if (action.type === "ADD_USER") {
        return {
          ...state,
          users: [...state.users, action.user]
        };
      } else if (action.type === "REMOVE_USER") {
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.id)
        };
      }

      // update by removing and adding updated user object
      else if (action.type === "UPDATE_USER") {
        return {
          ...state,
          users: [
            state.users.filter(user => user.id !== action.payload.id),
            action.payload.newUserObject
          ]
          //Object.assign({}, state.users, action.payload.newUserObject)
        };
      } else {
        return state;
      }
    }

    // STORE (in index.js)
    const store = createStore(myreducer);

    //     store.subscribe(() => {
    //   console.log("state updated");
    //   console.log(store.getState());
    // });

    // ------ ACTION CREATORS ------- ///
    const addTodoItem = function(item) {
      return {
        type: "ADD_TODO",
        todo: item
      };
    };

    const addPostItem = function(item) {
      return {
        type: "ADD_POST",
        post: item
      };
    };

    const addUser = function(userObject) {
      return {
        type: "ADD_USER",
        user: userObject
      };
    };

    const removeUser = function(id) {
      return {
        type: "REMOVE_USER",
        id
      };
    };

    const updateUser = function(id, newUserObject) {
      return {
        type: "UPDATE_USER",
        payload: {
          id,
          newUserObject
        }
      };
    };

    // Dispatch from a components
    store.dispatch(addTodoItem("eat CHOCOLATE"));
    store.dispatch(addTodoItem("eat more CHOCOLATE"));

    store.dispatch({
      type: "ADD_POST",
      post: "blog about life"
    });
    store.dispatch(addPostItem("write a letter to Santa"));
    store.dispatch(addPostItem("write a letter to Jesus"));

    const newUser1 = {
      id: 1000,
      name: "Bubba",
      points: 5
    };

    const newUser1_Updated = {
      id: 1000,
      name: "BubbaLICIOUS",
      points: 5
    };

    const newUser2 = {
      id: 2000,
      name: "Jeena",
      points: 15
    };

    const newUser3 = {
      id: 3000,
      name: "Bleeba",
      points: 150
    };

    store.dispatch(addUser(newUser1));
    store.dispatch(addUser(newUser2)); // removed
    store.dispatch(addUser(newUser3));

    store.dispatch(removeUser(2000));

    console.log(store.getState());

    store.dispatch(updateUser(1000, newUser1_Updated));

    console.log(store.getState());

    // -------------- END REDUX EXPERIMENT -------------- //


     */
  }

  // special onChange for dropdown field and name/id issue
  handleDropdownChange(event) {
    const districtSelectedOnDropdownId = event.target.value; // value == the id
    const districtSelectedOnDropdown = _.find(this.state.districts, {
      _id: districtSelectedOnDropdownId
    });

    this.setState(() => {
      return {
        districtSelectedOnDropdown
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const districtId = this.state.districtSelectedOnDropdown._id;

    this.setState(() => {
      return {
        currentDistrictRecord: this.state.districtSelectedOnDropdown,
        showDistrictDropdown: false,
        showAddDistrictButton: false
      };
    });

    // get all the schools from SELECTED DISTRICT
    fetch("/users/all_schools_in_district?district_id=" + districtId)
      .then(schools1 => schools1.json())
      .then(schools2 => {
        this.setState({
          schools: schools2,
          liveMessage: "",
          loadSchoolsList: true,
          districtSelectedOnDropdown: ""
        });
      });
  }

  // temp
  loadAddDistrict() {
    this.setState(() => {
      return {
        loadAddDistrictComponent: true,
        showAddDistrictButton: false,
        showDistrictDropdown: false,
        showChooseDistrict: false
      };
    });
  }

  loadingMessage(text) {
    this.setState(() => {
      return {
        liveMessage: text
      };
    });
  }

  newDistrictAdded(newDistrict) {
    this.loadingMessage(newDistrict.name_full + " Successfully Added");

    this.setState(() => {
      // update district array
      // clear the appropriate state
      // create a special live message?

      return {
        loadAddDistrictComponent: false,

        showAddDistrictButton: true,
        showDistrictDropdown: true,
        showChooseDistrict: true
      };
    });
  }

  render() {
    console.log(this.state.districts);

    const districtMenu = this.state.districts.map(district => (
      <OptionItem
        key={district._id}
        districtId={district._id}
        districtName={district.name_full}
      />
    ));

    return (
      <div>
        <div className="title">
          <h1>Administrator Access + UID</h1>
          {this.state.currentDistrictRecord ? (
            <h2>{this.state.currentDistrictRecord.name_full}</h2>
          ) : null}
        </div>

        {!this.state.currentDistrictRecord.name_full &&
        this.state.showChooseDistrict ? (
          <form onSubmit={this.handleSubmit}>
            <label>
              <select onChange={this.handleDropdownChange}>
                <option selected value="no-choice">
                  Choose district
                </option>
                {districtMenu}
              </select>
            </label>
            <div>
              <input type="submit" value="Submit" />
            </div>
          </form>
        ) : null}

        {this.state.loadSchoolsList && (
          <ListOfSchools
            currentDistrictRecord={this.state.currentDistrictRecord}
            districts={this.state.districts}
          />
        )}
        <h2> </h2>

        {this.state.showAddDistrictButton ? (
          <div>
            <button onClick={this.loadAddDistrict.bind(this)}>
              Add District
            </button>
          </div>
        ) : null}

        {this.state.loadAddDistrictComponent ? (
          <AddDistrict
            newDistrictAdded={this.newDistrictAdded}
            // clearAddDistrict={this.clearAddDistrict.bind(this)}
            // loadingMessage={this.loadingMessage.bind(this)}
          />
        ) : null}
      </div>
    );
  }
}
