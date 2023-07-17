import Notification from '../components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogin, logout } from '../reducers/userReducer';
import Togglable from '../components/Togglable';
import LoginForm from '../components/LoginForm';
import { Outlet } from 'react-router-dom';
import { fetchUser } from '../reducers/userReducer';
import { useEffect } from 'react';

export default function RootLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector(({ user }) => {
    return user;
  });

  const loginStatus = () => {
    return (
      <p style={{ fontWeight: 'bold' }}>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
    );
  };

  const login = async (credentials) => {
    dispatch(handleLogin(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user !== null && loginStatus()}
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm login={login} />
        </Togglable>
      ) : (
        <Outlet />
      )}
    </div>
  );
}
