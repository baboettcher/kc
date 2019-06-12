export const loadTeacherDashboard = fb_uid => {
  return (dispatch, getState) => {
    fetch("/teacher/" + fb_uid)
      .then(teacher1 => teacher1.json())
      .then(teacher2 => {
        dispatch({
          type: "LOAD_TEACHER_DASHBOARD",
          payload: teacher2
        });
      })
      .catch(error => console.error("Error loading teacher dash", error));
  };
};

export const clearTeacherOnSignout = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_TEACHER_ON_SIGNOUT"
    });
  };
};

// order reversed 6/2 in order to get the _id of addode and use THAT to push to teacher array
// Add to store?
export const teacherAddClass = ([newClassInfo, teacherId]) => {
  return (dispatch, getState) => {
    // ** 1:  Posting the entire new class to /joincode
    fetch("/joincode/", {
      method: "POST",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(parsedJSON => parsedJSON)
      .then(responseWithId => {
        // here whittle down to just the ID
        const {
          class_description,
          grade_level,
          _id,
          join_code
        } = responseWithId;
        const valuesForTeacherRecord = Object.assign(
          {},
          { class_description, grade_level, _id, join_code }
        );
        console.log("// valuesForTeacherRecord-->", valuesForTeacherRecord);
        fetch("/teacher/addclass/" + teacherId, {
          method: "PUT",
          body: JSON.stringify(valuesForTeacherRecord),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => response.json()) // check here for error in response
          .then(parsedJSON => console.log("Success----->>>>>:", parsedJSON))
          .catch(error => console.log("Error teacher adding a class", error));
      });
  };
};

export const setDefaultClass = defaultClass => {
  return dispatch => {
    dispatch({
      type: "TEACHER_SET_DEFAULT_CLASS",
      payload: defaultClass
    });
  };
};

/* 

// ORIG: 1) push to teacher array and then 2) post to joincode
export const teacherAddClass = ([newClassInfo, teacherId]) => {
  return (dispatch, getState) => {
    // 1) Push to teacher array of classes
    const url1 = "/teacher/addclass/" + teacherId;

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
};
 */
