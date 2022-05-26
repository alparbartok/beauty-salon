import { useContext, useState } from "react";
import { authApi } from "../api/auth";
import { AuthContext } from "../provider/Auth";

export const useAuth = () => {
  const { auth } = useContext(AuthContext);

  const [error, setError] = useState("");
  const login = async (credentials) => {
    await authApi
      .login(credentials)
      .then((res) => {
        setError("");
        localStorage.setItem("token", res.data.access_token);
      })
      .catch((err) => {
        setError(err.response.data.detail);
        throw new Error();
      });
  };

  const register = (account) => {
    authApi.register(account).then((res) => console.log(res));
  };

  return {
    logged: auth.logged,
    user: auth.user,
    login,
    register,
    error,
    setError,
  };
};
