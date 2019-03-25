export const addStudent = studentInfo => {
  return (dispatch, getState) => {
    // make async call
    dispatch({
      type: "ADD_STUDENT",
      studentInfo: studentInfo
    });
  };
};

export const clearStudentOnSignout = () => {
  return dispatch => {
    dispatch({
      type: "CLEAR_STUDENT_ON_SIGNOUT"
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
