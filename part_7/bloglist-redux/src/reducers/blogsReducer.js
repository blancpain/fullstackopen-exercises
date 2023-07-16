import { createSlice } from '@reduxjs/toolkit';
import blogServices from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    incrementLikes(state, action) {
      const { id } = action.payload;
      return state.map((a) => (a.id !== id ? a : action.payload));
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    popBlog(state, action) {
      const { id } = action.payload;
      return state.filter((a) => a.id !== id);
    },
    setBlogs(state, action) {
      return action.payload;
    },
  },
});

export const { appendBlog, incrementLikes, setBlogs, popBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogServices.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = (contents) => {
  return async (dispatch) => {
    const newBlog = await blogServices.create(contents);
    dispatch(appendBlog(newBlog));
  };
};

export const registerLike = (blogToUpdate) => {
  return async (dispatch) => {
    const updatedBlog = await blogServices.update(blogToUpdate.id, blogToUpdate);
    dispatch(incrementLikes(updatedBlog));
  };
};

export const removeBlog = (blogToDelete) => {
  return async (dispatch) => {
    await blogServices.remove(blogToDelete.id);
    dispatch(popBlog(blogToDelete));
  };
};

export default blogSlice.reducer;
