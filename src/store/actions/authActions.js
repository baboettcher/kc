export const signIn = credentials => {
  // third param is destructed to accesss firebase
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS"
        });
      });
  };
};

// signup as SUPER
// add firebase cloud functions
export const signUp = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    const functions = firebase.functions();
    console.log("FUNCTIONS?", functions);

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      // should dispatch happen AFTER mongo?
      .then(firebaseResp => {
        dispatch({
          type: "SIGNUP_SUCCESS"
          // add payload here to add to state
        });
        return firebaseResp;
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message, error.code);
        // ...
      })
      .then(firebaseResp => {
        const {
          uid,
          providerData,
          email,
          displayName,
          emailVerified
        } = firebaseResp.user;

        console.log("displayName:", displayName);
        console.log("email:", email);
        console.log("emailVerified:", emailVerified);
        console.log("uid:", uid);
        console.log("providerData:", providerData);

        // MONGO
        console.log("CREDENTIALS-->", credentials);
        const url = "/users/super";
        const data = {
          first_name: credentials.firstName,
          last_name: credentials.lastName,
          fb_uid: uid,
          initials: (
            credentials.firstName[0] + credentials.lastName[0]
          ).toUpperCase()
          // initials, email, etc...
          // how will auth level be recorded?
        };

        fetch(url, {
          method: "POST",
          body: JSON.stringify(data), // data can be `string` or {object}!
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response => console.log("Success:", JSON.stringify(response)))
          .catch(err => console.error("Entry invalid", err));
      });
  };
};
