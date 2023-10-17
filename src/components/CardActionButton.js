import { Button } from "@mui/material";

const CardActionButton = ({
  buttonText,
  handleClick,
  disabled = false,
  testId = "",
}) => {
  return (
    <Button
      size="small"
      variant="contained"
      sx={{ backgroundColor: "black", borderRadius: 2 }}
      onClick={handleClick}
      disabled={disabled}
      data-testid={testId}
    >
      {buttonText}
    </Button>
  );
};

export { CardActionButton };
