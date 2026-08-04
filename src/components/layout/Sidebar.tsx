import { useState } from "react";
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  // ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { NavLink } from "react-router-dom";
import { navigation } from "../../constants/navigation";

const drawerWidth = 260;

export default function Sidebar() {
  const [openProjects, setOpenProjects] = useState(true);

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
          {navigation.map((item, index) => {
            const Icon = item.icon;

            if (item.children) {
              return (
                <Box key={index}>
                  <ListItemButton
                    onClick={() => setOpenProjects(!openProjects)}
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

                    {openProjects ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>

                  <Collapse in={openProjects} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children.map((child) => (
                        <ListItemButton
                          key={child.path}
                          component={NavLink}
                          to={child.path}
                          sx={{
                            mx: 3,
                            borderRadius: 2,
                            "&.active": {
                              bgcolor: "primary.main",
                              color: "#fff",
                            },
                          }}
                        >
                          <ListItemText primary={child.title} />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            }

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
