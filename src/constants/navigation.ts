import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

export const navigation = [
  {
    title: "Dashboard",
    path: "/",
    icon: DashboardIcon,
  },
  {
    title: "Projects",
    path: "/projects",
    icon: FolderIcon,
  },
  {
    title: "Events",
    path: "/events",
    icon: EventIcon,
  },
  {
    title: "Alerts",
    path: "/alerts",
    icon: NotificationsIcon,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: AssessmentIcon,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: SettingsIcon,
  },
];