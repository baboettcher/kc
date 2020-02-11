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
        console.log("Joincode NOT found!!!", error);
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

export const updateStudentAvatar = (avatarObject) => {
  return dispatch => {

    console.log("avatarObject==>", avatarObject)
    // fetch(url1, {
    //   method: "PUT",
    //   body: JSON.stringify(avatarObject),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // }).then((student) => {
    //   dispatch({
    //     type: "UPDATE_STUDENT_AVATAR",
    //     payload: student
    //   })
    // })



  };
};


export const joinCodeClear = () => {
  return dispatch => {
    dispatch({
      type: "JOIN_CODE_CLEAR"
    });
  };
};

// v2 - using promise.all twice
export const studentAddClassWithCode = ({ joinCode, mongoStudentData }) => {
  // console.log("joinCode==>", joinCode);
  // console.log("mongoStudentData==>", mongoStudentData);
  return (dispatch, getState) => {
    const url1 = "/joincode/" + joinCode._id;
    const url2 = "/student/addtentativeclass/" + mongoStudentData._id;

    // 1) PUSH STUDENT RECORD TO JOINCODE /joincode/
    const f1_joinCodeResponse = fetch(url1, {
      method: "PUT",
      body: JSON.stringify(mongoStudentData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // 2) STUDENT RECORD PUSH TO ARRAY
    const f2_studentRecord = fetch(url2, {
      method: "PUT",
      body: JSON.stringify(joinCode),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const resultAll = Promise.all([f1_joinCodeResponse, f2_studentRecord]).then(
      responseArr => {
        return Promise.all(responseArr.map(item => item.json()));
      }
    );

    resultAll
      .then(promiseResults => {
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

// v1
export const studentAddClassWithCode_alt = ({ joinCode, mongoStudentData }) => {
  console.log("joinCode==>", joinCode);
  console.log("mongoStudentData==>", mongoStudentData);
  return (dispatch, getState) => {
    const url1 = "/joincode/" + joinCode._id;
    const url2 = "/student/addtentativeclass/" + mongoStudentData._id;

    // 1) PUSH STUDENT RECORD TO JOINCODE /joincode/
    const f1_joinCodeResponse = fetch(url1, {
      method: "PUT",
      body: JSON.stringify(mongoStudentData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // 2) STUDENT RECORD PUSH TO ARRAY
    const f2_studentRecord = fetch(url2, {
      method: "PUT",
      body: JSON.stringify(joinCode),
      headers: {
        "Content-Type": "application/json"
      }
    });

    async function getJsonResults(promisesArr) {
      // Get fetch promises response
      const results = await Promise.all(promisesArr);

      // Get JSON from each response promise
      const jsonResults = await Promise.all(results.map(r => r.json()));
      return jsonResults;
    }

    getJsonResults([f1_joinCodeResponse, f2_studentRecord])
      //.then(theResults => console.log("All results:", theResults))

      .then(promiseResults => {
        console.log("👘👘👘👘👘 promiseResults:", promiseResults);
        console.log("👘👘👘👘👘 promiseResults[0]:", promiseResults[0]);
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

// TO DO: 404 not being nabbed by .catch
export const studentAddClassWithCode_orig_with_external_process = ({
  joinCode,
  mongoStudentData
}) => {
  console.log("joinCode==>", joinCode);
  console.log("mongoStudentData==>", mongoStudentData);
  return (dispatch, getState) => {
    const url1 = "/joincode/" + joinCode._id;
    const url2 = "/student/addtentativeclass/" + mongoStudentData._id;

    // 1) PUSH STUDENT RECORD TO JOINCODE /joincode/
    const f1_joinCodeResponse = fetch(url1, {
      method: "PUT",
      body: JSON.stringify(mongoStudentData),
      headers: {
        "Content-Type": "application/json"
      }
    });

    // 2) STUDENT RECORD PUSH TO ARRAY
    const f2_studentRecord = fetch(url2, {
      method: "PUT",
      body: JSON.stringify(joinCode),
      headers: {
        "Content-Type": "application/json"
      }
    });

    let promiseResults = []; // promiseResults: 👑👑👑0_Class Record! 🧤🧤🧤1_Student Record!"

    // the helper function "process"
    // takes each promise (in responseArr) and runs .json()
    let process = prom => {
      prom.then(data => {
        promiseResults.push(data);
      });
    };

    // --------- NOTES  -------------

    // This Promise.all takes a 2-item array of promises
    // and runs helper function "process"
    // which pushes results to an array (promiseResults)
    // why am I getting an array, with both items
    // but individual indexs are undefined?

    // --------- EXAMPLE  -------------

    /*     Promise.all([a, b]).then(function([resultA, resultB]) {
      // more processing
      return;
    });
     */
    /* 
 
    // --------- NEW -------------
    Promise.all([f1_joinCodeResponse, f2_studentRecord])
      .then(function(responseArr) {
        responseArr.forEach(res => {
          process(res.json());
        });
      })
      .then(() => {
        dispatch({
          type: "STUDENT_ADD_CLASS_WITH_CODE",
          payload: promiseResults
        });
      });
 
 */

    // ORIG
    Promise.all([f1_joinCodeResponse, f2_studentRecord])
      .then(responseArr => {
        responseArr.forEach(res => {
          process(res.json());
        });
      })
      // .then((promiseResults)=>)// nothing passed bc we use promiseResults from above
      .then(() => {
        console.log("👘👘👘👘👘 promiseResults:", promiseResults);
        console.log("👘👘👘👘👘 promiseResults[0]:", promiseResults[0]);
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
