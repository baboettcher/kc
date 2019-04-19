const initialState = {
  authError: null,
  authCustomClaim: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      console.log("generic login success, acc: ", action.authCustomClaim);
      return {
        ...state,
        authError: null,
        authCustomClaim: action.authCustomClaim
      };

    case "LOGIN_ERROR":
      console.log("login error", action.err);
      return { ...state, authError: "Auth failed" }; // another option: authError: action.err

    case "SIGNOUT_SUCCESS":
      console.log(
        "signout success -> WHY is FB.auth not null when called from teacherSignedIn links?"
      );
      return { ...state, authCustomClaim: null };

    // --------- SIGNUP SUCCESS/ERROR --------///

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
        uid: null
      };

    case "SIGNUP_ADMIN_SUCCESS":
      console.log("signup ADMINISTRATOR success");
      return {
        ...state,
        authCustomClaim: "admin",
        authError: null
      };

    case "SIGNUP_ADMIN_ERROR":
      console.log("signup ERROR");
      return {
        ...state,
        authCustomClaim: null,
        authError: true
      };

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

    // --------- ADD TO MONGO SUCCESS--------///
    // This can be used as a temporay log-in OR in a modal saying creating the account was successfull, now log-on again

    case "ADD_TEACHER_MONGO_SUCCESS":
      return {
        ...state,
        newTeacherMongo: action.payload
      };
    case "ADD_STUDENT_MONGO_SUCCESS":
      return {
        ...state,
        newStudentMongo: action.payload
      };
    case "ADD_ADMIN_MONGO_SUCCESS":
      return {
        ...state,
        newAdminMongo: action.payload
      };

    // --------- AUTH CHECKED --------///
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
