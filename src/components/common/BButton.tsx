import { Button } from "@mui/material";

interface ButtonInterface {
  buttonName: string;
  fullWidth: boolean;
  color?: string;
  functionCall?: () => void;
}

const BButton = ({ buttonName, functionCall, fullWidth, color }: ButtonInterface) => {
  return (
    <Button
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
