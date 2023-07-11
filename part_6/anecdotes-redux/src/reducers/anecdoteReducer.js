import anecdoteServices from "../services/anecdotes";
import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    incrementVotes(state, action) {
      const { id } = action.payload;
      return state.map((a) => (a.id !== id ? a : action.payload));
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { appendAnecdote, incrementVotes, setAnecdotes } =
  anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const notes = await anecdoteServices.getAll();
    dispatch(setAnecdotes(notes));
  };
};

export const createAnecdote = (contents) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteServices.createNew(contents);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const registerVote = (anecdoteToUpdate) => {
  return async (dispatch) => {
    const changedObj = {
      ...anecdoteToUpdate,
      votes: anecdoteToUpdate.votes + 1,
    };
    const updatedAnecdote = await anecdoteServices.updateVotes(
      changedObj.id,
      changedObj
    );
    dispatch(incrementVotes(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
