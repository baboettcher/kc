const initialState = {
  authError: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("login error");
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
