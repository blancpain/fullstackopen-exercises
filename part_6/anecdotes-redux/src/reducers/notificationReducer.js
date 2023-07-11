import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(state, action) {
      return {
        ...state,
        message: action.payload,
      };
    },
    clearNotification(state) {
      return {
        ...state,
        message: "",
      };
    },
    setNotificationTimeoutId(state, action) {
      return {
        ...state,
        timeoutId: action.payload,
      };
    },
  },
});

export const setNotification = (notification, timing) => {
  return (dispatch, getState) => {
    const { timeoutId } = getState().notification;

    // below is done so that timeout persists between re-renders
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timing * 1000);

    dispatch(showNotification(notification));
    dispatch(notificationSlice.actions.setNotificationTimeoutId(newTimeoutId));
  };
};

export const { showNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
