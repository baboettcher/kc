export const loadTeacherDashboard = fb_uid => {
  return (dispatch, getState) => {
    console.log("💋💋💋--- >fb_uid: ", fb_uid);
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
