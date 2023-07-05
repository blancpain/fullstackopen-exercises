import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username{" "}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <br />
        <button type="submit">login</button>
      </form>
    );
  };

  const blogForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <h2>create new</h2>
        <div>
          title{" "}
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author{" "}
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url{" "}
          <input
            type="text"
            value={url}
            name="URL"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br />
        <button type="submit">create</button>
        <br />
        <br />
      </form>
    );
  };

  const allBlogs = () => {
    const currentBlogs = blogs.map((blog) => (
      <Blog key={blog.id} blog={blog} />
    ));
    return <div>{currentBlogs}</div>;
  };

  const loginStatus = () => {
    return (
      <p style={{ fontWeight: "bold" }}>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
    );
  };

  const clearBlogForm = () => {
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      setNotification({ message: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    const createdBlog = await blogService.create(newBlog);
    setBlogs([...blogs, createdBlog]);
    clearBlogForm();
    setNotification({
      message: `A new blog ${newBlog.title} by ${newBlog.author} added`,
    });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <div>
      <h2>Blogs</h2>
      <Notification notification={notification} />
      {user !== null && loginStatus()}
      {user !== null && blogForm()}
      {user === null ? loginForm() : allBlogs()}
    </div>
  );
};

export default App;
