import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const addAnecdote = (e) => {
    e.preventDefault();
    const contents = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(newAnecdote(contents));
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
}
