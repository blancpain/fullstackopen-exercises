const Notification = ({ message }) => {
  if (message) {
    return <p>{`a new anecdote ${message} created!`}</p>;
  } else {
    return null;
  }
};

export default Notification;
