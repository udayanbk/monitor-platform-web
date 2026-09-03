import { useState } from "react";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { login } from "../../api/auth.api";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { login: signIn } = useAuth();
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      const response = await login({
        empId: employeeId,
        password,
      });

      console.log(response);

      signIn(response.data.user);
      navigate("/", { replace: true });
    } catch (error: any) {
      setError(error?.response?.data?.message ?? "Invalid Employee ID or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      elevation={4}
      sx={{
        width: {
          xs: "100%",
          sm: 420,
        },
        borderRadius: 3,
      }}
    >
      <CardContent component="form" onSubmit={handleSubmit} sx={{ p: 5 }}>
        <Stack spacing={3} alignItems="center">
          <Avatar
            sx={{
              width: 72,
              height: 72,
              bgcolor: "primary.main",
            }}
          >
            <MonitorHeartIcon sx={{ fontSize: 38 }} />
          </Avatar>

          <Box textAlign="center">
            <Typography variant="h4" fontWeight={700} gutterBottom>
              SBIG Neo Monitor
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Enterprise Service Monitoring
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="Employee ID"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
          />

          <TextField
            fullWidth
            label="Password"
            placeholder="Enter Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box width="100%">
            <FormControlLabel
              control={
                <Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              }
              label="Remember Me"
            />
          </Box>

          <Button
            fullWidth
            variant="contained"
            type="submit"
            size="large"
            disabled={loading}
            sx={{
              height: 48,
              borderRadius: 2,
              fontWeight: 600,
            }}
          >
            {loading ? (
              <>
                <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <Typography variant="caption" color="text.secondary">
            Version 1.0.0
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
