import { Button } from "@mui/material";

interface ButtonInterface {
  buttonName: string;
  functionCall?: () => void;
}

const BButton = ({ buttonName, functionCall }: ButtonInterface) => {
  return (
    <Button
      fullWidth
      variant="outlined"
      sx={{ fontWeight: "bold", border: "3px solid", padding: 0 }}
      onClick={functionCall}
    >
      {buttonName}
    </Button>
  );
};

export default BButton;
