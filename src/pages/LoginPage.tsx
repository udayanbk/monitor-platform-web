import { Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";
import image from "../../public/sbi-general-image.png";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${image})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <Box sx={{ mt: 24 }}>
        <LoginForm />
      </Box>
    </Box>
  );
};

export default LoginPage;
