import axios from "axios";

const baseURL = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(baseURL);
  return res.data;
};

export const createAnecdote = async (newAnecdote) => {
  const res = await axios.post(baseURL, newAnecdote);
  return res.data;
};

export const updateAnecdote = async (updatedAnecdote) => {
  const res = await axios.put(
    `${baseURL}/${updatedAnecdote.id}`,
    updatedAnecdote
  );
  return res.data;
};
