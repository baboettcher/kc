const studentsReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_STUDENT_DASHBOARD":
      console.log("loaded student dashboard", action.payload);
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

    case "STUDENT_ADD_CLASS_WITH_CODE":
      console.log("TBC: Student add class with code");
      return {
        ...state,
        mongoData: null
      };

    default:
      return state;
  }
};

export default studentsReducer;
