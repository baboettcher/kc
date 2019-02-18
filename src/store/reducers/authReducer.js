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

    case "SIGNUP_SUPER_SUCCESS":
      console.log("signup SUPER success");
      return {
        ...state,
        authCustomClaim: "super",
        authError: null
      };

    case "SIGNUP_TEACHER_SUCCESS":
      console.log("signup TEACHER success");
      return {
        ...state,
        authCustomClaim: "teacher",
        authError: null
      };

    case "SIGNUP_STUDENT_SUCCESS":
      console.log("signup STUDENT success");
      return {
        ...state,
        authCustomClaim: "student",
        authError: null
      };

    case "SIGNUP_ADMINISTRATOR_SUCCESS":
      console.log("signup ADMINISTRATOR success");
      return {
        ...state,
        authCustomClaim: "administrator",
        authError: null
      };

    case "SIGNUP_ERROR":
      console.log("signup ERROR");
      return {
        ...state,
        authCustomClaim: null,
        authError: true
      };

    default:
      return state;
  }
};

export default authReducer;
