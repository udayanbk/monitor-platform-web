import { ReactNode, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth.api";
import { useAuthStore } from "./auth.store";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const response = await getCurrentUser();

        if (response?.data?.user) {
          login(response.data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Session restore failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, [login, logout]);

  if (loading) {
    return null;
  }

  return <>{children}</>;
};

export default AuthProvider;
