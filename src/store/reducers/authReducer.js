const initialState = {
  authError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_CHECKED_LOGGED_IN":
      console.log("====>>> auth check logged IN", action.payload);
      return state; // change state next

    case "AUTH_CHECKED_LOGGED_OUT":
      console.log("====>>> auth check logged OUT", action.payload);
      return state; // change state next

    case "LOGIN_ERROR":
      console.log("login error", action.err);
      return { ...state, authError: "Auth failed" }; // another option: authError: action.err

    case "LOGIN_SUCCESS":
      console.log("login success");
      return { ...state, authError: null };

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return state;

    case "SIGNUP_SUCCESS":
      console.log("signup success");
      return {
        ...state,
        authError: null
      };

    default:
      return state;
  }
};

export default authReducer;
