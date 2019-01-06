const initialState = {
  current: [
    { id: "11oi233jd", first: "Ana", last: "Lopez", kcoins: 10.5 },
    { id: "2973h923h", first: "JohnnyB", last: "Goode", kcoins: 20 },
    { id: "d244b8b2e", first: "Sarah", last: "Jonee", kcoins: 35.1 }
  ]
};
const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_STUDENT":
      console.log("student added", action.studentInfo);
  }
  return state;
};

export default studentsReducer;
