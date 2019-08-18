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

export const increaseStudentCredit = (fb_uid, creditsAwarded = 1) => {
  return (dispatch, getState) => {
    const url = "/teacher/increasecredit/" + fb_uid;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({ credits: creditsAwarded }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(student1 => student1.json())
      .then(student2 => {
        dispatch({
          type: "INCREASE_STUDENT_CREDIT",
          payload: student2
        });
      })
      .catch(error => console.error("Error loading student", error));
  };
};

export const decreaseStudentCredit = (fb_uid, creditsSubtracted = 1) => {
  return (dispatch, getState) => {
    const url = "/teacher/increasecredit/" + fb_uid;

    fetch(url, {
      method: "PUT",
      body: JSON.stringify({ credits: creditsSubtracted }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(student1 => student1.json())
      .then(student2 => {
        dispatch({
          type: "DECREASE_STUDENT_CREDIT",
          payload: student2
        });
      })
      .catch(error => console.error("Error loading student", error));
  };
};

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
        console.log("valuesForTeacherRecord-->", valuesForTeacherRecord);
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

export const refreshDefaultClass = _id => {
  return (dispatch, getState) => {
    fetch("/teacher/refreshdefaultclass/" + _id)
      .then(teacher1 => teacher1.json())
      .then(teacher2 => {
        dispatch({
          type: "REFRESH_DEFAULT_CLASS",
          payload: teacher2
        });
      })
      .catch(error => console.error("Error refreshing defaultClass", error));
  };
};
// STACK OVERFLOW ISSUE: What to load after updating?
// -- 1) loadTeacherDashboard AFTER updating record
//       in this case, update state locally for UI update
//       Currently TEACHER_SET_DEFAULT_CLASS is updating a special field outside mongoData
export const setDefaultClass = tempArrayDueTo2ndArgIssue => {
  console.log("tempArrayDueTo2ndArgIssue ===>", tempArrayDueTo2ndArgIssue);

  const classSelected = tempArrayDueTo2ndArgIssue[0];
  const _id = tempArrayDueTo2ndArgIssue[1];
  console.log("classSelected===>", classSelected);

  return dispatch => {
    fetch("/teacher/setdefaultclass/" + _id, {
      method: "PUT",
      body: JSON.stringify(classSelected),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(entireTeacherRecord => {
        console.log("👠👠👠entireTeacherRecord", entireTeacherRecord);
        dispatch({
          type: "TEACHER_SET_DEFAULT_CLASS",
          payload: entireTeacherRecord
        });
      });
  };
};
