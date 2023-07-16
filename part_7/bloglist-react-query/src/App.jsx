import { useEffect, useRef, useContext } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import NotificationContext from './NotificationContext';
import UserContext from './UserContext';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const App = () => {
  const blogFormRef = useRef();
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const [user, userDispatch, logUser] = useContext(UserContext);

  useEffect(() => {
    userDispatch({
      type: 'FETCH',
    });
  }, [userDispatch]);

  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newObj) => {
      queryClient.invalidateQueries('blogs');
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `A new blog ${newObj.title} by ${newObj.author} added`,
        },
      });

      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR',
        });
      }, 5000);
    },
    onError: () => {
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `Please fill out all the fields`,
          variant: 'error',
        },
      });

      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR',
        });
      }, 5000);
    },
  });
  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });
  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs');
    },
  });

  const { data, isLoading, isError, error } = useQuery('blogs', blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>{`Error: ${error.message}`}</div>;
  }

  const allBlogs = () => {
    const currentBlogs = data
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
    try {
      await logUser(credentials);
    } catch (err) {
      notificationDispatch({
        type: 'SET',
        payload: {
          message: `Wrong username or password`,
          variant: 'error',
        },
      });
      setTimeout(() => {
        notificationDispatch({
          type: 'CLEAR',
        });
      }, 5000);
    }
  };

  const handleLogout = () => {
    userDispatch({
      type: 'LOGOUT',
    });
  };

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject);
  };

  const updateBlog = async (e) => {
    e.preventDefault();
    const { name: targetedBlogId } = e.target;

    const targetedBlog = data.find((blog) => blog.id === targetedBlogId);
    const updatedLikes = targetedBlog.likes + 1;

    const updatedBlog = {
      id: targetedBlogId,
      title: targetedBlog.title,
      url: targetedBlog.url,
      author: targetedBlog.author,
      likes: updatedLikes,
    };

    updateBlogMutation.mutate(updatedBlog);
  };

  const deleteBlog = async (e) => {
    e.preventDefault();
    const { name: targetedBlogId } = e.target;
    const targetedBlog = data.find((blog) => blog.id === targetedBlogId);

    if (window.confirm(`Remove blog ${targetedBlog.title} by ${targetedBlog.author}`)) {
      deleteBlogMutation.mutate(targetedBlogId);
    }
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
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
