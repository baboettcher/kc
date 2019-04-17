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

export const teacherAddClass = newClassInfo => {
  return (dispatch, getState) => {
    // part 1 - update teacher array of classes
    // WHAT is the object being sent to the db for addCode?
    console.log("newClassInfo #1:", newClassInfo);
    const url1 = "/users/teacher_add_class/" + newClassInfo._id;
    fetch(url1, {
      method: "PUT",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error teacher adding a class", error));
    /* no need to update store -- VERIFY 
    .then(districtInfo =>
      dispatch({
        type: "TEACHER_ADD_CLASS",
        payload: districtInfo
      })
      )*/

    // part 2 - add to "add_code" db
    const url2 = "/users/save_new_addcode/";
    console.log("newClassInfo #2---->:", newClassInfo);

    fetch(url2, {
      method: "POST",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response =>
        console.log("Success adding to AddCode db:", JSON.stringify(response))
      ) // ERROR not being caught bt catch
      .catch(error =>
        console.error("=====> Error teacher adding class to AddCode db ", error)
      );
  };
};

// Signup teacher happening in auth actions

// export const addTeacher = newTeacherInfo => {
//   return (dispatch, getState) => {
//     // make async call
//     const url = "/users/addteacher";
//     const data = newTeacherInfo;

//     fetch(url, {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json"
//       }
//     })
//       .then(res => res.json())
//       .then(response => console.log("Success:", JSON.stringify(response)))
//       .then(() =>
//         dispatch({
//           type: "ADD_TEACHER",
//           payload: newTeacherInfo
//         })
//       )
//       .catch(error => console.error("Error adding district", error));
//   };
// };
