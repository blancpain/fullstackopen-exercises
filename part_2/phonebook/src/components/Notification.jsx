export default function Notification({ message }) {
  if (message === null) return null;

  let colorMsg = "green";
  let borderMsg = "2px solid green";

  if (
    message.includes("removed") ||
    message.includes("Cannot") ||
    message.includes("valid")
  ) {
    colorMsg = "red";
    borderMsg = "2px solid red";
  }

  const notificationStyles = {
    backgroundColor: "lightgray",
    fontSize: 25,
    color: colorMsg,
    border: borderMsg,
    padding: 5,
    marginBottom: 25,
  };

  return <div style={notificationStyles}>{message}</div>;
}
