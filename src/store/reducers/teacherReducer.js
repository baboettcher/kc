const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case "TEACHER_SET_DEFAULT_CLASS":
      return {
        ...state,
        defaultClass: action.payload
      };

    case "LOAD_TEACHER_DASHBOARD":
      return {
        ...state,
        mongoData: action.payload[0]
      };

    case "CLEAR_TEACHER_ON_SIGNOUT":
      console.log("clear teacher data");
      return {
        ...state,
        mongoData: null
      };

    case "TEACHER_ADD_CLASS":
      console.log("TBC: teacher add a class", action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};

export default teacherReducer;
