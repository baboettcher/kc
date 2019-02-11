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

export const signUp = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(firebaseResp => {
        dispatch({
          type: "SIGNUP_SUCCESS"
        });
        console.log("this is here?");
        return firebaseResp;
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message, error.code);
        // ...
      })
      .then(firebaseResp => {
        // create firebase superadmin object
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

        // MONGO SUPER CREATE HERE -- WITH UID!
        const url = "/users/super";
        const data = {
          first_name: "johnny",
          last_name: "beGoode",
          fb_uid: uid
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
          .catch(error => console.error("Entry invalid"));
      });
  };
};
