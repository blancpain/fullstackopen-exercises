import { useSelector, useDispatch } from "react-redux";
import { registerVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector(({ search, anecdotes }) => {
    if (search === "") {
      return anecdotes.map((a) => a);
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(search.toLowerCase())
    );
  });

  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(registerVote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5));
  };

  const allAnecdotes = anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => handleVote(anecdote)}>vote</button>
        </div>
      </div>
    ));

  return <div>{allAnecdotes}</div>;
}
