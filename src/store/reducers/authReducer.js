const initialState = {
  authError: null,
  authCustomClaim: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("login success, acc: ", action.authCustomClaim);
      return {
        ...state,
        authError: null,
        authCustomClaim: action.authCustomClaim
      };

    case "LOGIN_ERROR":
      console.log("login error", action.err);
      return { ...state, authError: "Auth failed" }; // another option: authError: action.err

    case "SIGNOUT_SUCCESS":
      console.log("signout success");
      return { ...state, authCustomClaim: null };

    case "SIGNUP_SUPER_SUCCESS":
      console.log("signup SUPER success-- action");
      return {
        ...state,
        authCustomClaim: "super", // ISSUE: this clears on browser refresh
        authError: null,
        user: action.user
      };

    case "SIGNUP_SUPER_ERROR":
      console.log("Auth error after SUPER customclaim success");
      return {
        ...state,
        authCustomClaim: null,
        authError: action.err,
        user: null
      };

    case "SIGNUP_TEACHER_SUCCESS":
      console.log("signup TEACHER success");
      return {
        ...state,
        authCustomClaim: "teacher", // ISSUE: this clears on browser refresh
        authError: null,
        user: action.user
      };

    case "SIGNUP_TEACHER_ERROR":
      console.log("Auth error after TEACHER customclaim success");

      return {
        ...state,
        authCustomClaim: null,
        authError: action.err,
        user: null
      };

    case "SIGNUP_STUDENT_SUCCESS":
      console.log("signup STUDENT success");
      return {
        ...state,
        authCustomClaim: "student",
        authError: null
      };

    case "SIGNUP_STUDENT_ERROR":
      console.log("Auth error after STUDENT customclaim success");

      return {
        ...state,
        authCustomClaim: null,
        authError: action.err,
        user: null
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

    case "AUTH_CHECKED_LOGGED_IN":
      console.log("====>>> auth check logged IN", action.payload);
      return state; // change state next

    case "AUTH_CHECKED_LOGGED_OUT":
      console.log("====>>> auth check logged OUT", action.payload);
      return state; // change state next

    default:
      return state;
  }
};

export default authReducer;
