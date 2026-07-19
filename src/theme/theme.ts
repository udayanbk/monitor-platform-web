import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#455a64",
    },
    success: {
      main: "#2e7d32",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
  },

  shape: {
    borderRadius: 10,
  },

  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;