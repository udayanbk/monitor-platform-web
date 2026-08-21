import { createContext, useContext, useState, ReactNode } from "react";

import { AlertColor } from "@mui/material";
import AppSnackbar from "../components/common/AppSnackbar";

interface SnackbarContextType {
  showSnackbar: (severity: AlertColor, message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState<AlertColor>("success");
  const [message, setMessage] = useState("");

  const showSnackbar = (newSeverity: AlertColor, newMessage: string) => {
    setSeverity(newSeverity);
    setMessage(newMessage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}

      <AppSnackbar open={open} message={message} severity={severity} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used inside SnackbarProvider");
  }

  return context;
};
