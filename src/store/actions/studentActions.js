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

// TO DO: 404 not being nabbed by catch
export const studentAddClassWithCode = ({ joinCode, mongoStudentData }) => {
  return (dispatch, getState) => {
    const url1 = "/joincode/" + joinCode._id;
    const url2 = "/student/addtentativeclass/" + mongoStudentData._id;

    // 1) ADDCODE TO UPDATE:
    const f1 = fetch(url1, {
      method: "PUT",
      body: JSON.stringify(mongoStudentData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // 2) STUDENT RECORD TO UPDATE
    const f2 = fetch(url2, {
      method: "PUT",
      body: JSON.stringify(joinCode),
      headers: {
        "Content-Type": "application/json"
      }
    });

    let promiseResults = [];
    let process = prom => {
      prom.then(data => {
        promiseResults.push(data);
      });
    };

    Promise.all([f1, f2])
      .then(responseArr => {
        responseArr.forEach(res => {
          process(res.json());
        });
      }) // nothing passed bc we use promiseResults from above
      .then(() => {
        dispatch({
          type: "STUDENT_ADD_CLASS_WITH_CODE",
          payload: promiseResults
        });
      })

      .catch(error => {
        console.error(
          "PART #1: 🐲🐲🐲ERROR pushing student data to addcode",
          error
        );

        dispatch({
          type: "STUDENT_ADD_CLASS_WITH_CODE_ERROR"
        });
      });
  };
};

// TO DO: Combine all fetch calls into "all or none"
export const studentAddClassWithCode_orig = ({
  joinCode,
  mongoStudentData
}) => {
  return (dispatch, getState) => {
    // 1) ADDCODE TO UPDATE:
    const url1 = "/joincode/" + joinCode._id;

    fetch(url1, {
      method: "PUT",
      body: JSON.stringify(mongoStudentData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(
        parsedJSON =>
          console.log(
            "🐖🐖🐖🐖🐖🐖PART #1: Student data pushed to addcode",
            parsedJSON
          ),
        err => console.log("🚔🚔🚔🚔🚔ERROR ------>>", err)
      )
      .catch(error =>
        console.error(
          "PART #1: 🐲🐲🐲🐲🐲🐲ERROR pushing student data to addcode",
          error
        )
      );

    // 2) STUDENT RECORD TO UPDATE
    const url2 = "/student/addtentativeclass/" + mongoStudentData._id;
    fetch(url2, {
      method: "PUT",
      body: JSON.stringify(joinCode),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(parsedJSON =>
        console.log("PART 2: Addcode data pushed to student", parsedJSON)
      )
      .catch(error =>
        console.log("PART 2: Error pushing addcode data to student", error)
      );

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
