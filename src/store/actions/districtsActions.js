export const addDistrict = districtInfo => {
  return (dispatch, getState) => {
    // make async call
    dispatch({
      type: "ADD_DISTRICT",
      districtInfo: districtInfo
    });
  };
};

export const getAllDistricts = () => {
  return (dispatch, getState) => {
    // make async call
    fetch("/users/all_districts")
      .then(districts1 => districts1.json())
      .then(districts => {
        dispatch({
          type: "GET_ALL_DISTRICTS",
          districts
        });
      })
      .catch(err => {
        console.log("Error on initial load", err);
      });
  };
};
