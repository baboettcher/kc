// custom claims attempt  -- can't access auth.onAuthStateChanged()

//
// Run in Navbar on mount
// what method can I use to get auth status?
// why not just ook up property on Mongo?

export const authCheck = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          firebase
            .auth()
            .currentUser.getIdToken(true)

            .then(idToken => {
              dispatch({ type: "AUTH_CHECKED_LOGGED_IN", payload: idToken });
            });
        } else {
          dispatch({ type: "AUTH_CHECKED_LOGGED_OUT", payload: null });
        }
      })
      .catch(() => {
        console.log("auth change error - TEMP");
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

export const signIn = credentials => {
  // third param is destructed to accesss firebase
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => console.log("==> sign in "))
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      })

      // ------- CHECK CUSTOMER CLAIM ------
      // later: add to state and create autthClaimChecker  ------
      .then(() => {
        const auth = firebase.auth();
        auth.onAuthStateChanged(user => {
          if (user) {
            user.getIdTokenResult().then(idTokenResult => {
              console.log(idTokenResult.claims);
            });

            // auth.currentUser.getIdToken(true).then(idToken => {
            //   console.log(
            //     "CLAIM ON SIGN-IN CHECKED: idToken CLAIMS",
            //     idToken.claims
            //   );
            // });
          } else {
            console.log("CLAIM ON SIGN-IN CHECKED: Logged out");
          }
          return "DONE";
        });
      });
  };
};

/* 
export const signIn = credentials => {
  // third param is destructed to accesss firebase
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => console.log("==> sign in "))
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      })

      // ------- CHECK CUSTOMER CLAIM ------
      // later: add to state and create autthClaimChecker  ------
      .then(() => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                console.log(
                  "CLAIM ON SIGN-IN CHECKED: idToken CLAIMS",
                  idToken.claims
                );
              });
          } else {
            console.log("CLAIM ON SIGN-IN CHECKED: Logged out");
          }
          return "DONE";
        });
      });
  };
};
 */
// signup as SUPER
export const signUp = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      // should dispatch happen AFTER mongo?
      .then(firebaseResp => {
        const { user } = firebaseResp.user;
        console.log("USER ====->", user);
        dispatch({
          type: "SIGNUP_SUCCESS"
          // MOVE DISPATCH TO END
          // add payload here to add to state
        });
        return firebaseResp;
      })
      // ------------------- FIREBASE CUSTOM CLAIM: SUPER ------------------ //
      .then(firebaseResp => {
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addSuperRole = functions.httpsCallable("addSuperRole");
        addSuperRole({ email }).then(result => {
          console.log("firebase claim result:", result);
        });

        return firebaseResp; // what is returned her is irrelevant (?)
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message, error.code);
        // ...
      })

      //------------------- TEMPORARY AUTH CHECKER------------------ //
      .then(firebaseResp => {
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(idToken => {
                console.log("STATUS CHECKED: idToken", idToken);
              });
          } else {
            console.log("STATUS CHECKED: Logged out");
          }
          return firebaseResp;
        });
      });

    // ------------------- MONGO ------------------ //

    /* 
      .then(firebaseResp => {
        const {
          uid,
          providerData,
          email,
          displayName,
          emailVerified
        } = firebaseResp.user;

        const url = "/users/super";
        const data = {
          first_name: credentials.firstName,
          last_name: credentials.lastName,
          fb_uid: uid,
          initials: (
            credentials.firstName[0] + credentials.lastName[0]
          ).toUpperCase(),
          kc_auth: {
            //TEMP
            super: true,
            admin: true,
            student: true,
            teacher: true
          }
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

       */
  };
};
