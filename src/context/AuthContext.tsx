import { createContext, type ReactNode, useContext } from "react";
import type { AuthResponse } from "../api/types";
import { useCurrentUser } from "../hooks/useCurrentUser";

type AuthContextValue = {
  user: AuthResponse | null;
  isAuthenticated: boolean;
  isPending: boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user = null, isPending } = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: Boolean(user), isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
