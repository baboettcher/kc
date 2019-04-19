export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({
          type: "SIGNOUT_SUCCESS" // need to clear ALL state: teacher, student, admin, super
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
        const auth = firebase.auth();
        auth.onAuthStateChanged(user => {
          if (user) {
            user
              .getIdTokenResult()
              .then(idTokenResult => {
                const { authCustomClaim } = idTokenResult.claims;
                return authCustomClaim;
              })
              .then(authCustomClaim => {
                console.log("authCustomClaim-->", authCustomClaim);
                dispatch({ type: "LOGIN_SUCCESS", authCustomClaim });
              })
              .catch(err => console.log("Error in custom claim", err));
          } else {
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

export const signUpStudent = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const {
      firstName,
      lastName,
      email,
      classroomCode,
      authLevel
    } = credentials;

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)

      // ------------------- SET DISPLAY NAME / PIC ------------------ //
      .then(firebaseResp => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstName + " " + lastName,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });
        return firebaseResp;
      })

      // ------------------- FIREBASE CUSTOM CLAIM: STUDENT ------------------ //
      .then(firebaseResp => {
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addStudentRole = functions.httpsCallable("addStudentRole");
        addStudentRole({ email }).then(result => {
          console.log("STUDENT firebase claim result:", result);
        });
        return firebaseResp;
      })

      .then(firebaseResp => {
        const { user } = firebaseResp;
        dispatch({
          type: "SIGNUP_STUDENT_SUCCESS",
          user
        });
        return firebaseResp;
      })

      // --- MONGO --- //
      .then(firebaseResp => {
        const { uid } = firebaseResp.user;
        console.log(`+++ 11111 +++ uid: ${uid} +++++`);
        const url = "/student";

        const data = {
          first_name: firstName,
          last_name: lastName,
          email,
          fb_uid: uid,
          new_class_code: classroomCode ? classroomCode : null
        };

        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response =>
            dispatch({
              type: "ADD_STUDENT_MONGO_SUCCESS",
              payload: response
            })
          )
          .catch(error => console.error("Mongo error adding student", error));
      })

      .catch(err => {
        console.log("Error", err);
        dispatch({
          type: "SIGNUP_STUDENT_ERROR",
          err
        });
      });
  };
};

export const signUpTeacher = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const {
      authLevel,
      firstName,
      lastName,
      schoolName,
      email,
      currentStudents,
      currentClasses
    } = credentials;

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)

      // ------------------- SET DISPLAY NAME / PIC ------------------ //
      .then(firebaseResp => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstName + " " + lastName,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });
        return firebaseResp;
      })

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

      .then(firebaseResp => {
        const { user } = firebaseResp;
        dispatch({
          type: "SIGNUP_TEACHER_SUCCESS",
          user
        });
        return firebaseResp;
      })

      // --- TEACHER MONGO --- //
      .then(firebaseResp => {
        const { uid } = firebaseResp.user;
        //const url = "/users/addteacher";
        const url = "/teacher";

        const data = {
          first_name: firstName,
          last_name: lastName,
          fb_uid: uid,
          email,
          school_name: schoolName,
          current_students: currentStudents,
          current_classes: currentClasses
        };

        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response =>
            dispatch({
              type: "ADD_TEACHER_MONGO_SUCCESS",
              payload: response
            })
          )
          .catch(error => console.error("Mongo error adding teacher", error));
      })

      .catch(err => {
        dispatch({
          type: "SIGNUP_TEACHER_ERROR",
          err
        });
      });
  };
};

export const signUpAdmin = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const {
      firstName,
      lastName,
      school,
      district,
      state,
      email,
      authLevel
    } = credentials;

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)

      // ------------------- SET DISPLAY NAME / PIC ------------------ //
      .then(firebaseResp => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstName + " " + lastName,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });

        return firebaseResp;
      })

      // ------------------- FIREBASE CUSTOM CLAIM: ADMIN ------------------ //
      .then(firebaseResp => {
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addAdminRole = functions.httpsCallable("addAdminRole");
        addAdminRole({ email }).then(result => {
          console.log("firebase ADMIN claim result:", result);
        });

        return firebaseResp;
      })
      .catch(function(err) {
        console.log("Error", err.message, err.code);
      })

      .then(firebaseResp => {
        const { user } = firebaseResp;
        dispatch({
          type: "SIGNUP_ADMIN_SUCCESS",
          user
        });
        return firebaseResp;
      })
      // --- ADMIN MONGO --- //
      .then(firebaseResp => {
        const { uid } = firebaseResp.user;
        //const url = "/users/addteacher";
        const url = "/admin";

        const data = {
          first_name: firstName,
          last_name: lastName,
          email,
          fb_uid: uid,
          school_name: school,
          district_name: district,
          state
        };

        fetch(url, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => res.json())
          .then(response =>
            dispatch({
              type: "ADD_ADMIN_MONGO_SUCCESS",
              payload: response
            })
          )
          .catch(error => console.error("Mongo error adding admin", error));
      })

      .catch(err => {
        dispatch({
          type: "SIGNUP_ADMIN_ERROR",
          err
        });
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

      // ------------------- SET DISPLAY NAME / PIC ------------------ //
      .then(firebaseResp => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
          displayName: firstName + " " + lastName,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        });
        return firebaseResp;
      })

      // ------------------- FIREBASE CUSTOM CLAIM: SUPER ------------------ //
      .then(firebaseResp => {
        const { email } = firebaseResp.user;
        const functions = firebase.functions();
        const addSuperRole = functions.httpsCallable("addSuperRole");
        addSuperRole({ email }).then(result => {
          console.log("SUPER firebase claim result:", result);
        });
        return firebaseResp;
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
        console.log("Error", err);
        dispatch({
          type: "SIGNUP_SUPER_ERROR",
          err
        });
      });
  };
};
