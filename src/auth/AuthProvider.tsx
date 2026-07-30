import { ReactNode, useState } from "react";
import AuthContext from "./AuthContext";
import { User } from "./auth.types";

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));

  const [user, setUser] = useState<User | null>(() => {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  });

  const login = (token: string, user: User) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
