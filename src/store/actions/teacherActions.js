export const loadTeacherDashboard = fb_uid => {
  return (dispatch, getState) => {
    const url = "/users/load_teacher_dashboard?fb_uid=";

    console.log("load Teacher Dash action");

    fetch(url + fb_uid)
      .then(teacher1 => teacher1.json())
      .then(teacher2 => {
        dispatch({
          type: "LOAD_TEACHER_DASHBOARD",
          payload: teacher2
        });
      })
      .catch(error => console.error("Error adding teacher", error));
  };
};

export const teacherAddClass = newClassInfo => {
  return (dispatch, getState) => {
    const url = "/users/teacher_add_class/" + newClassInfo.uid;

    console.log("newClassInfo-->", newClassInfo);

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .then(districtInfo =>
        dispatch({
          type: "TEACHER_ADD_CLASS",
          payload: districtInfo
        })
      )
      .catch(error => console.error("Error teacher adding a class", error));
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
