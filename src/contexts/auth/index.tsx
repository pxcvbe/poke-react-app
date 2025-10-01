import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { readJSON, writeJSON, uid } from "../../utils/storage";

export type User = { id: string; email: string };

type StoredUser = User & { password: string };

type AuthCtx = {
  user: User | null;
  login: (e: string, p: string) => { ok: boolean; error?: string };
  register: (e: string, p: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | null>(null);
const USERS_KEY = "pokedex.auth.users";
const SESSION_KEY = "pokedex.auth.session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    setUser(readJSON<User | null>(SESSION_KEY, null));
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      login: (email, password) => {
        email = email.trim().toLowerCase();
        const users = readJSON<StoredUser[]>(USERS_KEY, []);
        const found = users.find(
          (u) => u.email === email && u.password === password
        );
        if (!found) return { ok: false, error: "Invalid email/password" };
        const u: User = { id: found.id, email: found.email };
        writeJSON(SESSION_KEY, u);
        setUser(u);
        return { ok: true };
      },
      register: (email, password) => {
        email = email.trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
          return { ok: false, error: "Invalid email" };
        if (password.length < 4)
          return { ok: false, error: "Password min 4 chars" };
        const users = readJSON<StoredUser[]>(USERS_KEY, []);
        if (users.some((u) => u.email === email))
          return { ok: false, error: "Email already registered" };
        const newUser: StoredUser = { id: uid(), email, password };
        users.push(newUser);
        writeJSON(USERS_KEY, users);
        const u: User = { id: newUser.id, email: newUser.email };
        writeJSON(SESSION_KEY, u);
        setUser(u);
        return { ok: true };
      },
      logout: () => {
        writeJSON(SESSION_KEY, null as any);
        setUser(null);
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
