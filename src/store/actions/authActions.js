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

      // ------- CHECK CUSTOM CLAIM ------ //
      .then(() => {
        const auth = firebase.auth(); // refactor out firebase.auth()
        auth.onAuthStateChanged(user => {
          if (user) {
            user
              .getIdTokenResult()
              .then(idTokenResult => {
                const { authCustomClaim } = idTokenResult.claims;
                return authCustomClaim;
              })
              .then(authCustomClaim => {
                console.log("AGAIN ACC-->", authCustomClaim);
                dispatch({ type: "LOGIN_SUCCESS", authCustomClaim });
              })
              .catch(err => console.log("Error in custom claim", err));
          } else {
            // user no logged in. Next steps here?
            console.log("CLAIM ON SIGN-IN CHECKED: Logged out");
            return null;
          }
        });
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

export const signUpTeacher = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { authLevel, firstName, lastName } = credentials;

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)

      // ------------------- FIREBASE CUSTOM CLAIM: TEACHER ------------------ //
      .then(firebaseResp => {
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addTeacherRole = functions.httpsCallable("addTeacherRole");
        addTeacherRole({ email }).then(result => {
          console.log("firebase claim result:", result);
        });

        return firebaseResp;
      })
      .catch(function(err) {
        console.log("Error", err.message, err.code);
      })

      .then(firebaseResp => {
        const { user } = firebaseResp;
        dispatch({
          type: "SIGNUP_TEACHER_SUCCESS",
          user
        });
        return firebaseResp;
      })

      .catch(err => {
        dispatch({
          type: "SIGNUP_TEACHER_ERROR",
          err
        });
      })

      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstName + " " + lastName,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });

        // .then(() => {
        //   console.log("inside update profile");
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      })

      .catch(err => {
        console.log("Error Updating Profile");
      });
  };
};

export const signUpSuper = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { authLevel, firstName, lastName } = credentials;

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)

      // ------------------- FIREBASE CUSTOM CLAIM: SUPER ------------------ //
      .then(firebaseResp => {
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addSuperRole = functions.httpsCallable("addSuperRole");
        addSuperRole({ email }).then(result => {
          console.log("firebase claim result:", result);
        });
        return firebaseResp;
      })
      .catch(function(err) {
        console.log("Error", err.message, err.code);
      })

      .then(firebaseResp => {
        const { user } = firebaseResp;
        dispatch({
          type: "SIGNUP_SUPER_SUCCESS",
          user
        });
        return firebaseResp;
      })

      .catch(err => {
        dispatch({
          type: "SIGNUP_SUPER_ERROR",
          err
        });
      })

      .then(() => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstName + " " + lastName,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });

        // .then(() => {
        //   console.log("inside update profile");
        // })
        // .catch(err => {
        //   console.log(err);
        // });
      })
      .catch(err => {
        console.log("Error Updating Profile");
      });
  };
};

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

/* 

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



export const signUpSuper = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const { authLevel } = credentials;

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)

      // ------------------- FIREBASE CUSTOM CLAIM: SUPER ------------------ //
      .then(firebaseResp => {
        console.log("#2 -->", firebaseResp);
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addSuperRole = functions.httpsCallable("addSuperRole");
        addSuperRole({ email }).then(result => {
          console.log("firebase claim result:", result);
        });

        return firebaseResp; // what is returned here is irrelevant (?)
      })
      .catch(function(err) {
        console.log("Error", err.message, err.code);
      })

      .then(firebaseResp => {
        const { user } = firebaseResp;
        dispatch({
          type: "SIGNUP_SUPER_SUCCESS",
          user
        });
        return firebaseResp;
      })
      .catch(err => {
        dispatch({
          type: "SIGNUP_SUPER_ERROR",
          err
        });
      });


  };
}; */
