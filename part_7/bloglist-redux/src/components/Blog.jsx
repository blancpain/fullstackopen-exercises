import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { registerLike, removeBlog } from '../reducers/blogsReducer';

/* eslint-disable react/prop-types */
const Blog = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const user = useSelector(({ user }) => {
    return user;
  });

  //TODO - implement redirect when logging out...
  //! figure out how to fix the refresh issue
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  const selectedBlog = blogs.find((blog) => blog.id === id);

  if (!selectedBlog) return null;

  //! can refactor below as we don't need to find the blog anymore?
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

  //! can refactor below as we don't need to find the blog anymore?
  const deleteBlog = async (e) => {
    e.preventDefault();
    const { name: targetedBlogId } = e.target;
    const targetedBlog = blogs.find((blog) => blog.id === targetedBlogId);

    if (window.confirm(`Remove blog ${targetedBlog.title} by ${targetedBlog.author}`)) {
      dispatch(removeBlog(targetedBlog));
    }
  };

  return (
    <div id="blog">
      <h2>{selectedBlog.title}</h2>

      <div>{selectedBlog.url}</div>
      <div>
        {selectedBlog.likes} likes{' '}
        <button name={selectedBlog.id} onClick={updateBlog} id="like-button">
          like
        </button>
      </div>
      <div>
        <div> added by {selectedBlog.user.name} </div>
        {selectedBlog.user.username === user.username && (
          <button
            name={selectedBlog.id}
            onClick={deleteBlog}
            style={{ backgroundColor: 'blue', color: 'white' }}
            id="delete-button"
          >
            delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Blog;
