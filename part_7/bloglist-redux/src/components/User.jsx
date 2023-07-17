import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAllUsers } from '../reducers/usersReducer';

export default function User() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const allUsers = useSelector(({ users }) => {
    return users;
  });

  const selectedUser = allUsers.find((user) => user.id === id);
  return (
    selectedUser && (
      <>
        <h2>{selectedUser.name}</h2>
        <h4>added blogs</h4>
        <ul>
          {selectedUser.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      </>
    )
  );
}
