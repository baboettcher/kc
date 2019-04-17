const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_TEACHER_DASHBOARD":
      console.log(
        "🎃🎃🎃🎃🎃load teacher dashboard, payload-->>",
        action.payload
      );
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
      console.log("teacher add a class", action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};

export default teacherReducer;
