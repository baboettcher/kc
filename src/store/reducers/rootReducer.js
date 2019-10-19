import { firebaseReducer } from "react-redux-firebase";
import authReducer from "./authReducer";
import groupReducer from "./groupReducer";
import studentReducer from "./studentReducer";
import teacherReducer from "./teacherReducer"; // no 's'
import districtsReducer from "./districtsReducer";
import adminReducer from "./adminReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer,
  teacher: teacherReducer,
  admin: adminReducer,
  groups: groupReducer,
  student: studentReducer,
  districts: districtsReducer
});

export default rootReducer;

// to synch with firestore db, import firestore reducer to sync state inthe background
// firebase config passed in index.js
// react-redux@5.1.1 react-redux-firebase@2.1.6 redux-firestore@0.5.7 firebase@5.3.0
