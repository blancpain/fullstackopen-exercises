import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../requests";
import { useContext } from "react";
import NotificationContext from "../NotificationContext";

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const data = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", [...data, newAnecdote]);
      dispatch({
        type: "SHOW",
        payload: `anecdote '${newAnecdote.content}' created`,
      });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
    onError: (error) => {
      console.log(error.message);
      dispatch({
        type: "SHOW",
        payload: `Anecdote too short, must have length of 5 or more`,
      });
      setTimeout(() => {
        dispatch({ type: "HIDE" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
