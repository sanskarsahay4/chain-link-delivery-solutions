import { createContext, useState, useEffect } from "react";
import { loginApi, logoutApi, getProfile } from "../api/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const res = await loginApi(email, password);
    setUser(res.user);
  };

  const logout = async () => {
    await logoutApi();
    setUser(null);
  };

  const loadUser = async () => {
    const res = await getProfile();
    setUser(res.user);
  };

  useEffect(() => { loadUser(); }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
