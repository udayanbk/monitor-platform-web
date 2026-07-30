import { Box } from "@mui/material";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <LoginForm />
    </Box>
  );
};

export default LoginPage;
