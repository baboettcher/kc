const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_TEACHER_DASHBOARD":
      console.log("loaded teacher dashboard", action.payload);
      return {
        ...state,
        mongoData: action.payload
      };

    case "CLEAR_TEACHER_ON_SIGNOUT":
      console.log("clear teacher data");
      return {
        ...state,
        mongoData: null
      };

    case "TEACHER_ADD_CLASS":
      console.log("teacher add a class", action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};

export default teacherReducer;
