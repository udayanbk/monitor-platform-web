import { Report } from "./ReportsTable";

export const getProjectStyles = (project: string) => {
  switch (project.toUpperCase()) {
    case "NIVARAN":
      return {
        backgroundColor: "#e3f2fd",
        color: "#1565c0",
        borderColor: "#90caf9",
      };

    case "SIMBA":
      return {
        backgroundColor: "#f3e5f5",
        color: "#7b1fa2",
        borderColor: "#ce93d8",
      };

    case "INSTA":
      return {
        backgroundColor: "#fff3e0",
        color: "#e65100",
        borderColor: "#ffcc80",
      };

    case "RENEWAL":
      return {
        backgroundColor: "#e8f5e9",
        color: "#2e7d32",
        borderColor: "#a5d6a7",
      };

    case "PAI":
      return {
        backgroundColor: "#fce4ec",
        color: "#c2185b",
        borderColor: "#f48fb1",
      };

    default:
      return {};
  }
};

type ChannelType = "EMAIL" | "CALL" | "WHATSAPP" | "SMS";
export const getChannelStyles = (channel: ChannelType) => {
  switch (channel) {
    case "EMAIL":
      return {
        backgroundColor: "#e3f2fd",
        color: "#1565c0",
        borderColor: "#90caf9",
      };

    case "WHATSAPP":
      return {
        backgroundColor: "#e8f5e9",
        color: "#2e7d32",
        borderColor: "#a5d6a7",
      };

    case "SMS":
      return {
        backgroundColor: "#fff3e0",
        color: "#e65100",
        borderColor: "#ffcc80",
      };

    case "CALL":
      return {
        backgroundColor: "#f3e5f5",
        color: "#7b1fa2",
        borderColor: "#ce93d8",
      };

    default:
      return {};
  }
};

export const getModeStyles = (mode: Report["mode"]) => {
  switch (mode) {
    case "SCHEDULED":
      return {
        backgroundColor: "#e0f2f1",
        color: "#00695c",
        borderColor: "#80cbc4",
      };

    case "MANUAL":
      return {
        backgroundColor: "#fff8e1",
        color: "#f57f17",
        borderColor: "#ffe082",
      };

    default:
      return {};
  }
};
