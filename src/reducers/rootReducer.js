const initState = {
  districtTest: [
    { id: "1000", name: "HUSD", schools_mini_list: ["bla", "ra", "ka"] },
    { id: "2000", name: "OUSD", schools_mini_list: ["la", "pa", "fa"] },
    { id: "3000", name: "SFUSD", schools_mini_list: ["za", "ga", "wa"] }
  ]
};

// but initial state is hard coded. how do i start from the database?

const rootReducer = (state = initState, action) => {
  //console.log("ACTION", action);

  // if (action.type === "DELETE_MONSTER"){
  //   const newDistrictTest = districtTest.filter((dt)=> dt )
  // }

  return state;
};

export default rootReducer;
