import BlogForm from './BlogForm';
import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBlog, initializeBlogs } from '../reducers/blogsReducer';
import Togglable from './Togglable';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function BlogList() {
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector(({ blogs }) => {
    return blogs.map((b) => b);
  });

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(addBlog(blogObject));
  };

  const allBlogs = () => {
    const currentBlogs = blogs
      .sort((a, b) => b.likes - a.likes)
      .map((blog) => (
        <p key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </p>
      ));

    return <div id="all-blogs">{currentBlogs}</div>;
  };

  return (
    <>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {allBlogs()}
    </>
  );
}
