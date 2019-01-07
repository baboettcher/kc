export const addDistrict = districtInfo => {
  return (dispatch, getState) => {
    // make async call

    const url = "/users/district";
    const data = districtInfo;

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
          type: "ADD_DISTRICT",
          payload: districtInfo
        })
      )
      .catch(error => console.error("Error addinDistrict", error));
  };
};

// fix payload
export const getAllDistricts = () => {
  return (dispatch, getState) => {
    fetch("/users/all_districts")
      .then(districts1 => districts1.json())
      .then(districts => {
        dispatch({
          type: "GET_ALL_DISTRICTS",
          districts
        });
      })
      .catch(err => {
        console.log("Error fetching getAllDistricts", err);
      });
  };
};
