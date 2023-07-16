import { useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { setNotification } from './reducers/notificationReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs, addBlog, registerLike, removeBlog } from './reducers/blogsReducer';
import { handleLogin, fetchUser, logout } from './reducers/userReducer';

const App = () => {
  const blogFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => {
    return blogs.map((b) => b);
  });

  const user = useSelector(({ user }) => {
    return user;
  });

  const allBlogs = () => {
    const currentBlogs = blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          loggedUser={user}
          deleteBlog={deleteBlog}
        />
      ));

    return <div id="all-blogs">{currentBlogs}</div>;
  };

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

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addBlog(blogObject));
    dispatch(setNotification(`A new blog ${blogObject.title} by ${blogObject.author} added`, 5));
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    const { name: targetedBlogId } = e.target;

    const targetedBlog = blogs.find((blog) => blog.id === targetedBlogId);
    const updatedLikes = targetedBlog.likes + 1;

    const updatedBlog = {
      id: targetedBlog.id,
      title: targetedBlog.title,
      author: targetedBlog.author,
      url: targetedBlog.url,
      likes: updatedLikes,
    };

    dispatch(registerLike(updatedBlog));
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    const { name: targetedBlogId } = e.target;
    const targetedBlog = blogs.find((blog) => blog.id === targetedBlogId);

    if (window.confirm(`Remove blog ${targetedBlog.title} by ${targetedBlog.author}`)) {
      dispatch(removeBlog(targetedBlog));
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user !== null && loginStatus()}
      {user !== null && (
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
      )}
      {user === null ? (
        <Togglable buttonLabel="log in">
          <LoginForm login={login} />
        </Togglable>
      ) : (
        allBlogs()
      )}
    </div>
  );
};

export default App;
