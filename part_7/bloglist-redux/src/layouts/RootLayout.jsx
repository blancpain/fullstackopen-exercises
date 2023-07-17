import Notification from '../components/Notification';
import { useSelector, useDispatch } from 'react-redux';
import { handleLogin, logout } from '../reducers/userReducer';
import Togglable from '../components/Togglable';
import LoginForm from '../components/LoginForm';
import { Outlet, useNavigate } from 'react-router-dom';
import { fetchUser } from '../reducers/userReducer';
import { useEffect } from 'react';
import Menu from '../components/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function RootLayout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const user = useSelector(({ user }) => {
    return user;
  });

  const loginStatus = () => {
    return (
      <p style={{ fontWeight: 'bold' }}>
        {user.username} logged in{' '}
        <Button size="small" variant="contained" onClick={handleLogout}>
          logout
        </Button>
      </p>
    );
  };

  const login = async (credentials) => {
    dispatch(handleLogin(credentials));

    navigate('/blogs');
  };

  const handleLogout = () => {
    dispatch(logout());

    navigate('/');
  };

  return (
    <div>
      <Typography variant="h2">Blogs</Typography>
      <Notification />
      {user !== null && <Menu loggedStatus={loginStatus} />}
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
