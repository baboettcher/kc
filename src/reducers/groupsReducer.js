const initialState = {
  current: [
    { id: "24d2", name: "Apples", category: "reading", members: 20 },
    { id: "32ww", name: "Golden Triangles", category: "math", members: 30 },
    { id: "89ju", name: "Magical Pens", category: "writing", members: 15 }
  ]
};

const groupsReducer = (state = initialState, action) => {
  return state;
};

export default groupsReducer;
