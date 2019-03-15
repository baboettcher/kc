const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_TEACHER_DASHBOARD":
      console.log("loaded teacher dashboard", action.payload);
      return {
        ...state,
        mongoData: action.payload
      };

    default:
      return state;
  }
};

export default teacherReducer;
