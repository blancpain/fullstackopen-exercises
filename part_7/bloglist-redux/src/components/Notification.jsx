import { useSelector } from 'react-redux';

export default function Notification() {
  const notification = useSelector(({ notification }) => {
    return notification;
  });

  let colorMsg = 'green';
  let borderMsg = '2px solid green';

  if (notification.variant === 'error') {
    colorMsg = 'red';
    borderMsg = '2px solid red';
  }

  const notificationStyles = {
    backgroundColor: 'lightgray',
    fontSize: 25,
    color: colorMsg,
    border: borderMsg,
    padding: 5,
    marginBottom: 25,
  };

  return (
    notification.message && (
      <div style={notificationStyles} id="notification">
        {notification.message}
      </div>
    )
  );
}
