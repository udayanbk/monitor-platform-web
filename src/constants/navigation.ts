import SpeedIcon from "@mui/icons-material/Speed";
import FolderIcon from "@mui/icons-material/Folder";
import EventIcon from "@mui/icons-material/Event";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";

import { SvgIconComponent } from "@mui/icons-material";

type ChildItem = {
  title: string;
  path: string;
};

export type NavigationItem =
  | {
      title: string;
      path: string;
      icon: SvgIconComponent;
      children?: never;
    }
  | {
      title: string;
      icon: SvgIconComponent;
      children: ChildItem[];
      path?: never;
    };

export const navigation: NavigationItem[] = [
  {
    title: "Health-Checks",
    path: "/",
    icon: SpeedIcon,
  },
  {
    title: "Projects",
    icon: FolderIcon,
    children: [
      {
        title: "Nivaran",
        path: "/projects/nivaran",
      },
      {
        title: "Renewal",
        path: "/projects/renewal",
      },
      {
        title: "HRMS",
        path: "/projects/hrms",
      },
      {
        title: "Customer Portal",
        path: "/projects/customer-portal",
      },
    ],
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
