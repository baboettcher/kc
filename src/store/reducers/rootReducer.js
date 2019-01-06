import authReducer from "./authReducer";
import currentUserReducer from "./currentUserReducer";

import groupsReducer from "./groupsReducer";
import studentsReducer from "./studentsReducer";
import districtsReducer from "./districtsReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  currentUser: currentUserReducer,
  groups: groupsReducer,
  students: studentsReducer,
  districts: districtsReducer
});

export default rootReducer;
