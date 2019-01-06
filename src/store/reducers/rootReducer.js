import authReducer from "./authReducer";
import groupsReducer from "./groupsReducer";
import studentsReducer from "./studentsReducer";
import currentUserReducer from "./currentUserReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  groups: groupsReducer,
  students: studentsReducer,
  currentUser: currentUserReducer
});

export default rootReducer;
