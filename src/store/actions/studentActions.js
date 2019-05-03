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

export const addStudent = studentInfo => {
  return (dispatch, getState) => {
    // make async call
    dispatch({
      type: "ADD_STUDENT",
      studentInfo: studentInfo
    });
  };
};

export const joinCodeCheck = joinCode => {
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

export const joinCodeClear = () => {
  return dispatch => {
    dispatch({
      type: "JOIN_CODE_CLEAR"
    });
  };
};

export const studentAddClassWithCode = ([newClassInfo, classId]) => {
  return (dispatch, getState) => {
    // 1) STUDENT RECORD TO UPDATE
    //    push to pending_classes (NEW)
    //        this new array takes ID only
    //        populates pending_classes_display (?) for dashboard - HOW LONG?
    //    clear/update store

    // 2) ADDCODE TO UPDATE:
    //    Push studentID to pending_students array (NEW)
    //        this new ID accepts references only
    //        populate will be called when teacher logs in to confirm

    // 3)  TEACHER (L) teacherConfirmsStudent will then check pending_students, and confirm individually to add then to current)students

    // * DIAGRAM ENTIRE DATABASE IN WIREFRAME

    /*   const url1 = "/teacher/addclass/" + teacherId;

    fetch(url1, {
      method: "PUT",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json()) // error?
      .then(parsedJSON => console.log("Success Step #1:", parsedJSON))
      .catch(error =>
        console.log("Error in Step #1 teacher adding a class", error)
      );

    //2) - NEED THE WHOLE TEACHER OBJECT
    fetch("/joincode/", {
      method: "POST",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(parsedJSON => console.log("Success Step #2:", parsedJSON))
      .catch(error =>
        console.log("Error in Step #2 teacher adding a class", error)
      );
  };
 */

    dispatch({
      type: "STUDENT_ADD_CLASS_WITH_CODE"
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
