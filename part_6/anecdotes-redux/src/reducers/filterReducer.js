const initialState = "";

const filterReducer = (state = initialState, action) => {
  console.log("state now - filter: ", state);
  console.log("action", action);

  switch (action.type) {
    case "FILTER": {
      return action.payload;
    }
    default:
      return state;
  }
};

export const search = (input) => {
  return {
    type: "FILTER",
    payload: input,
  };
};

export default filterReducer;
