import {
  Drawer,
  Toolbar,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";

import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";

const drawerWidth = 260;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRight: "1px solid #eee",
        },
      }}
    >
      <Toolbar>
        <Typography variant="h5" color="primary" sx={{ fontWeight: "bold" }}>
          Monitor
        </Typography>
      </Toolbar>

      <Box sx={{ overflow: "auto" }}>
        <List>
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <ListItemButton
                key={item.path}
                component={NavLink}
                to={item.path}
                sx={{
                  mx: 1,
                  borderRadius: 2,

                  "&.active": {
                    bgcolor: "primary.main",
                    color: "#fff",
                  },

                  "&.active .MuiListItemIcon-root": {
                    color: "#fff",
                  },
                }}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>

                <ListItemText primary={item.title} />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
}
