import { Button } from "@mui/material";

const CardActionButton = ({ buttonText, handleClick, disabled = false }) => {
  return (
    <Button
      size="small"
      variant="contained"
      sx={{ backgroundColor: "black", borderRadius: 2 }}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </Button>
  );
};

export { CardActionButton };
