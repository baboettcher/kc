const initialState = {
  current: [
    { id: "1123233jd", name: "Lilly White Ville", abbreviation: "LVUSD" },
    { id: "21231923h", name: "Herbert School", abbreviation: "HSUSD" },
    { id: "d2412312e", name: "San Rafael", abbreviation: "SFRUSD" }
  ]
};

const districtsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_DISTRICT":
      return state.concat([action.payload]);

    case "DELETE_DISTRICT":
      return state.filter(dist => dist._id !== action.payload);

    case "GET_ALL_DISTRICTS":
      return action.districts;
  }
  return state;
};

export default districtsReducer;
