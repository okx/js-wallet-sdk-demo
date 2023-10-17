import { Button } from "@mui/material";

const CardActionButton = ({
  buttonText,
  onClick,
  disabled = false,
  testId = "",
}) => {
  return (
    <Button
      size="small"
      variant="contained"
      sx={{ backgroundColor: "black", borderRadius: 2 }}
      onClick={onClick}
      disabled={disabled}
      data-testid={testId}
    >
      {buttonText}
    </Button>
  );
};

export { CardActionButton };
