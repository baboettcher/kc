export const loadAdminDashboard = fb_uid => {
  return (dispatch, getState) => {
    console.log("💋💋💋--- >fb_uid: ", fb_uid);
    fetch("/admin/" + fb_uid)
      .then(admin1 => admin1.json())
      .then(admin2 => {
        dispatch({
          type: "LOAD_ADMIN_DASHBOARD",
          payload: admin2
        });
      })
      .catch(error => console.error("Error loading teacher dash", error));
  };
};

export const clearAdminOnSignout = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_ADMIN_ON_SIGNOUT"
    });
  };
};

export const adminAddClass = newClassInfo => {
  return (dispatch, getState) => {
    // part 1 - update teacher array of classes
    // WHAT is the object being sent to the db for addCode?
    console.log("newClassInfo #1:", newClassInfo);
    const url1 = "/users/admin_add_class/" + newClassInfo._id;
    fetch(url1, {
      method: "PUT",
      body: JSON.stringify(newClassInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => console.log("Success:", JSON.stringify(response)))
      .catch(error => console.error("Error admin adding a class", error));
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
        console.error("=====> Error admin adding class to AddCode db ", error)
      );
  };
};
