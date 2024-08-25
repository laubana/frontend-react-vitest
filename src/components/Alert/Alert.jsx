import Alert from "react-bootstrap/Alert";

export default ({ button, message, variant }) => {
  return (
    <Alert variant={variant || "danger"}>
      {message || "An unexpected error occurred. Please try again later."}
      <br />
      {button}
    </Alert>
  );
};
