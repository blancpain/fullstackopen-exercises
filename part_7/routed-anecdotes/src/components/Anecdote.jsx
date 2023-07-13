import { useParams } from "react-router-dom";

export default function Anecdote({ anecdotes }) {
  const { id } = useParams();
  const anecdote = anecdotes.find((a) => a.id === Number(id));

  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>has {anecdote.votes} votes</p>
      <p>for more info see {anecdote.info}</p>
    </>
  );
}
