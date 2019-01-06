export const addDistrict = districtInfo => {
  return (dispatch, getState) => {
    // make async call
    dispatch({
      type: "ADD_DISTRICT",
      districtInfo: districtInfo
    });
  };
};

/* 
export const addStudent = () => {
  return {
    type: "ADD_STUDENT",
    studentInfo: "all the info"
  };
};
 */
