import { create } from "zustand";

export interface AuthUser {
  id: number;
  empId: string;
  name: string;
  email: string;
  roleId: number;
}

interface AuthState {
  accessToken: string | null;
  user: AuthUser | null;

  login: (accessToken: string, user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  user: null,

  login: (accessToken, user) => {
    set({
      accessToken,
      user,
    });
  },

  logout: () => {
    set({
      accessToken: null,
      user: null,
    });
  },
}));
