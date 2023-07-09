export default function App({ store }) {
  const good = () => {
    store.dispatch({
      type: "GOOD",
    });
  };
  const ok = () => {
    store.dispatch({
      type: "OK",
    });
  };
  const bad = () => {
    store.dispatch({
      type: "BAD",
    });
  };
  const reset = () => {
    store.dispatch({
      type: "RESET",
    });
  };

  return (
    <div>
      <button onClick={good} data-testid="good-button">
        good
      </button>
      <button onClick={ok} data-testid="ok-button">
        ok
      </button>
      <button onClick={bad} data-testid="bad-button">
        bad
      </button>
      <button onClick={reset} data-testid="reset-button">
        reset stats
      </button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
}
