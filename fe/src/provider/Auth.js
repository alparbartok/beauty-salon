import { createContext, useState } from "react";
import JwtDecode from "jwt-decode";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ logged: false });

  const token = localStorage.getItem("token");

  if (token && !auth?.user) {
    setAuth({ user: JwtDecode(token), logged: true });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
