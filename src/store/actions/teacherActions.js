export const loadTeacherDashboard = fb_uid => {
  return (dispatch, getState) => {
    const url = "/users/loadteacher";

    console.log("load Teacher Dash action");
    /*    fetch("/users/teacher_record?id=" + fb_uid) // how can i get the data ?
      .then(teacher1 => teacher1.json())

      .then(teacher2 =>
        dispatch({
          type: "LOAD_TEACHER_DASHBOARD",
          payload: teacher2
        })
      )
      .catch(error => console.error("Error adding teacher", error)); */
  };
};

export const addTeacher = newTeacherInfo => {
  return (dispatch, getState) => {
    // make async call
    const url = "/users/addteacher";
    const data = newTeacherInfo;

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .then(() =>
        dispatch({
          type: "ADD_TEACHER",
          payload: newTeacherInfo
        })
      )
      .catch(error => console.error("Error adding district", error));
  };
};
