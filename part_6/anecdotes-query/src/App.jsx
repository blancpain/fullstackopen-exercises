import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getAll, updateAnecdote } from "./requests";
import { useContext } from "react";
import NotificationContext from "./NotificationContext";

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext);

  const { data, isLoading, isError, error } = useQuery("anecdotes", getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  if (isLoading) {
    return <div>loading data...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  const handleVote = (anecdote) => {
    dispatch({ type: "SHOW", payload: `anecdote '${anecdote.content}' voted` });
    setTimeout(() => {
      dispatch({ type: "HIDE" });
    }, 5000);
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
