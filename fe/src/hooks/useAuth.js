import { useContext, useState } from "react";
import { authApi } from "../api/auth";
import { AuthContext } from "../provider/Auth";
import JwtDecode from "jwt-decode";

export const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const [error, setError] = useState("");
  const login = async (credentials) => {
    await authApi
      .login(credentials)
      .then((res) => {
        setError("");
        localStorage.setItem("token", res.data.access_token);
        setAuth({
          logged: true,
          user: JwtDecode(res.data.access_token),
        });
      })
      .catch((err) => {
        setError(err.response.data.detail);
        throw new Error();
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ logged: false });
  };

  const register = async (account) => {
    await authApi.register(account);
    await login({ email: account.email, password: account.password });
  };

  return {
    logged: auth.logged,
    user: auth.user,
    login,
    register,
    error,
    setError,
    logout,
  };
};
