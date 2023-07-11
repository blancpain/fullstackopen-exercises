import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

export const setNotification = (notification, timing) => {
  return (dispatch) => {
    dispatch(showNotification(notification));

    setTimeout(() => {
      dispatch(clearNotification());
    }, timing * 1000);
  };
};

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
