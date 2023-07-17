import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';

export default function UserList() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const allUsers = useSelector(({ users }) => {
    return users;
  });

  console.log(allUsers);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {allUsers.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`${user.id.toString()}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
