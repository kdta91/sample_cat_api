import Button from "react-bootstrap/Button";

const Btn = ({ text, variant, onClick, disabled, style }) => {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {text}
    </Button>
  );
};

export default Btn;
