type Props = {
  message: string;
};

const Notification = (props: Props) => {
  return props.message && <div style={{ color: "red" }}>{props.message}</div>;
};

export default Notification;
