import Alert from "react-bootstrap/Alert";

const AlertNotification = ({ variant, text }) => {
  return <Alert variant={variant}>{text}</Alert>;
};

export default AlertNotification;
