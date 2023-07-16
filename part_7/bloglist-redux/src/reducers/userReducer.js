import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';
import loginServices from '../services/login';
import { setNotification } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const fetchUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogServices.setToken(user.token);
    }
  };
};

export const handleLogin = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginServices.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogServices.setToken(user.token);
      dispatch(setUser(user));
    } catch (e) {
      dispatch(setNotification('Wrong username or password', 5, 'error'));
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    dispatch(clearUser());
  };
};

export default userSlice.reducer;
