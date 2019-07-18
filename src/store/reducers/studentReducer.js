const studentsReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_STUDENT_DASHBOARD":
      return {
        ...state,
        mongoData: action.payload[0]
      };

    case "CLEAR_STUDENT_ON_SIGNOUT":
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

    case "STUDENT_ADD_CLASS_WITH_CODE":
      console.log("💋💋💋💋PAYLOAD💋💋💋💋💋💋💋", action.payload);
      return {
        ...state,
        thing123_FULL: action.payload,
        thing123_0: action.payload[0]
        //mongoData: action.payload[1]
      };

    // STUDENT_ADD_CLASS - not being used yet
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

    case "ADD_STUDENT":
      console.log("TBC: Student added", action.studentInfo);

    default:
      return state;
  }
};

export default studentsReducer;
