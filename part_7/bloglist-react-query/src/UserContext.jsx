import { createContext, useReducer } from 'react';
import loginService from './services/login.js';
import blogService from './services/blogs.js';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return action.payload;
    }
    case 'LOGOUT': {
      window.localStorage.removeItem('loggedUser');
      return null;
    }
    case 'FETCH': {
      const loggedUserJSON = window.localStorage.getItem('loggedUser');
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        blogService.setToken(user.token);
        return { ...user };
      }
      return null;
    }
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, null);

  const logUser = async (credentials) => {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    userDispatch({ type: 'LOGIN', payload: user });
  };

  return (
    <UserContext.Provider value={[user, userDispatch, logUser]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
