import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  variant: '',
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      const { text } = action.payload;
      const { variant } = action.payload;
      return {
        ...state,
        message: text,
        variant: variant,
      };
    },
    clearNotification(state) {
      return {
        ...state,
        message: '',
        variant: '',
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

export const setNotification = (text, timing, variant = '') => {
  return (dispatch, getState) => {
    const { timeoutId } = getState().notification;

    // below is done so that timeout persists between re-renders
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      dispatch(clearNotification());
    }, timing * 1000);

    dispatch(showNotification({ text, variant }));
    dispatch(notificationSlice.actions.setNotificationTimeoutId(newTimeoutId));
  };
};

export const { showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
