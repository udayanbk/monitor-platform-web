import { useAuthStore } from "./auth.store";

const useAuth = () => {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);

  return {
    accessToken,
    user,
    login,
    logout,
    isAuthenticated: !!accessToken,
  };
};

export default useAuth;
