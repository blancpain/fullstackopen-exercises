import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import AnecdoteList from "./components/AnecdoteList";
import Layout from "./layouts/Layout";
import Anecdote from "./components/Anecdote";
import Notification from "./components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(anecdote.content);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <>
              <Notification message={notification} />
              <AnecdoteList anecdotes={anecdotes} />
            </>
          ),
        },
        {
          path: "anecdotes",
          element: (
            <>
              <Notification message={notification} />
              <AnecdoteList anecdotes={anecdotes} />
            </>
          ),
        },
        {
          path: "anecdotes/:id",
          element: <Anecdote anecdotes={anecdotes} />,
        },
        {
          path: "create",
          element: <CreateNew addNew={addNew} />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
