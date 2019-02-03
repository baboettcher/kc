import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";

import groupsReducer from "./groupsReducer";
import studentsReducer from "./studentsReducer";
import districtsReducer from "./districtsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
  currentUser: currentUserReducer,
  groups: groupsReducer,
  students: studentsReducer,
  districts: districtsReducer
});

export default rootReducer;

// to synch with firestore db, import firestore reducer to sync state inthe background
// firebase config passed in index.js
// react-redux@5.1.1 react-redux-firebase@2.1.6 redux-firestore@0.5.7 firebase@5.3.0
