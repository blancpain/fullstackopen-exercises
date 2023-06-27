export default function Notification({ message }) {
  if (message === null) return null;

  //TODO - control the state here based on msg.includes...
  const notificationStyles = {
    backgroundColor: "lightgray",
    fontSize: 25,
    color: message.includes("removed") ? "red" : "green",
    border: message.includes("removed") ? "2px solid red" : "2px solid green",
    padding: 5,
    marginBottom: 25,
  };

  return <div style={notificationStyles}>{message}</div>;
}
