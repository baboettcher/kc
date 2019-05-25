const studentsReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_STUDENT_DASHBOARD":
      //console.log("loaded student dashboard", action.payload[0]);
      return {
        ...state,
        mongoData: action.payload[0]
      };

    case "CLEAR_STUDENT_ON_SIGNOUT":
      console.log("clear student data");
      return {
        ...state,
        mongoData: null
      };

    case "JOIN_CODE_MATCH":
      return {
        ...state,
        join_code: action.payload,
        join_code_found: true
      };

    case "JOIN_CODE_NOT_FOUND":
      return {
        ...state,
        join_code: null,
        join_code_found: false
      };

    case "JOIN_CODE_CLEAR":
      return {
        ...state,
        join_code: null,
        join_code_found: null
      };

    case "ADD_STUDENT":
      console.log("TBC: Student added", action.studentInfo);

    // STUDENT_ADD_CLASS - not being used yet
    case "STUDENT_ADD_CLASS_WITH_CODE":
      return {
        ...state,
        recentClassAdded: action.payload
      };

    case "STUDENT_ADD_CLASS_WITH_CODE_CLEAR":
      return {
        ...state,
        recentClassAddedBool: false // this after return to dashboard
      };

    case "STUDENT_ADD_CLASS_WITH_CODE_ERROR":
      return {
        ...state,
        recentClassAddedBool: false
      };

    default:
      return state;
  }
};

export default studentsReducer;
