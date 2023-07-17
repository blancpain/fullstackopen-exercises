import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { registerLike, removeBlog, addComment } from '../reducers/blogsReducer';
import { nanoid } from '@reduxjs/toolkit';

/* eslint-disable react/prop-types */
const Blog = () => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { id } = useParams();

  const user = useSelector(({ user }) => {
    return user;
  });

  //! figure out how to fix the refresh issue
  const blogs = useSelector(({ blogs }) => {
    return blogs;
  });

  const selectedBlog = blogs.find((blog) => blog.id === id);
  if (!selectedBlog) return null;

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

  const submitComment = (e) => {
    e.preventDefault();
    dispatch(addComment(selectedBlog, comment));
    setComment('');
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

        <h2>Comments</h2>
        <form onSubmit={submitComment}>
          <span>
            <input
              type="text"
              value={comment}
              id="title"
              name="Title"
              placeholder="comment"
              onChange={({ target }) => setComment(target.value)}
            />
          </span>
          <button type="submit">add comment</button>
          <br />
        </form>
        <ul>
          {selectedBlog.comments.map((comment) => {
            return <li key={nanoid()}>{comment}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default Blog;
