export const loadStudentDashboard = fb_uid => {
  return (dispatch, getState) => {
    fetch("/student/" + fb_uid)
      .then(student1 => student1.json())
      .then(student2 => {
        dispatch({
          type: "LOAD_STUDENT_DASHBOARD",
          payload: student2
        });
      })
      .catch(error => console.error("Error loading student", error));
  };
};

export const clearStudentOnSignout = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_STUDENT_ON_SIGNOUT"
    });
  };
};

export const checkJoinCode = joinCode => {
  // FETCH CALL HERE!
  console.log("🔫🔫🔫🔫JOIN CODE", joinCode);
  return (dispatch, getState) => {
    fetch("/joincode/" + joinCode)
      .then(joincode1 => joincode1.json())
      .then(joincode2 => {
        dispatch({
          type: "JOIN_CODE_MATCH",
          payload: joincode2[0]
        });
      })
      .catch(error => {
        console.log("Joincode NOT found", error);
        dispatch({
          type: "JOIN_CODE_NOT_FOUND"
        });
      });
  };

  // return dispatch => {
  //   dispatch({
  //     type: "CHECK_JOIN_CODE"
  //   });
  // };
};

export const studentAddClassWithCode = () => {
  return dispatch => {
    dispatch({
      type: "STUDENT_ADD_CLASS_WITH_CODE"
    });
  };
};

export const addStudent = studentInfo => {
  return (dispatch, getState) => {
    // make async call
    dispatch({
      type: "ADD_STUDENT",
      studentInfo: studentInfo
    });
  };
};

/* 
export const addStudent = () => {
  return {
    type: "ADD_STUDENT",
    studentInfo: "all the info"
  };
};
 */
