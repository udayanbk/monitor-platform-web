import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const drawerWidth = 260;

export default function Header() {
  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={1}
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <Toolbar>
        <Typography variant="h6">
          Monitor Platform
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton>
          <RefreshIcon />
        </IconButton>

        <IconButton>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}