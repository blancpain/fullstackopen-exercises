import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const filterSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search(state, action) {
      return action.payload;
    },
  },
});

export const { search } = filterSlice.actions;
export default filterSlice.reducer;
