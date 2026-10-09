import { Button } from "@mui/material";

interface ButtonInterface {
  buttonName: string;
  fullWidth: boolean;
  color?: string;
  functionCall?: () => void;
  disabled?: boolean;
}

const BButton = ({ buttonName, functionCall, fullWidth, color, disabled }: ButtonInterface) => {
  return (
    <Button
      disabled={disabled}
      fullWidth={fullWidth}
      variant="outlined"
      sx={{
        fontWeight: "bold",
        border: "2px solid",
        px: fullWidth ? 0 : 2,
        py: 0.5,
        color: color ? color : null,
      }}
      onClick={functionCall}
    >
      {buttonName}
    </Button>
  );
};

export default BButton;
