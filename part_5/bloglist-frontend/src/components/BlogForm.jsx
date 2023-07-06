import { useState } from "react";

export default function BlogForm({ createBlog }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    createBlog(newBlog);
    clearForm();
  };

  const clearForm = () => {
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
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
}
