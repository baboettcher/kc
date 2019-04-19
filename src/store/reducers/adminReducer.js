const adminReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOAD_ADMIN_DASHBOARD":
      return {
        ...state,
        mongoData: action.payload[0]
      };

    case "CLEAR_ADMIN_ON_SIGNOUT":
      console.log("clear teacher data");
      return {
        ...state,
        mongoData: null
      };

    case "ADMIN_ADD_CLASS":
      console.log("TBC: admin add a class", action.payload);
      return {
        ...state
      };

    default:
      return state;
  }
};

export default adminReducer;
