export interface User {
  id: number;
  empId: string;
  name: string;
  email: string;
  roleId: number;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}
