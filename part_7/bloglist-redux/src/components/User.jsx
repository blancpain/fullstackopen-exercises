import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export default function User() {
  const { id } = useParams();

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
