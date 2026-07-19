import { createContext } from "react";
import { AuthContextType } from "./auth.types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;