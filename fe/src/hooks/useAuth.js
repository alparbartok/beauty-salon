import { useState } from "react";
import { authApi } from "../api/auth";

export const useAuth = () => {
  const [error, setError] = useState("");
  const login = (credentials) => {
    authApi
      .login(credentials)
      .then((res) => {
        setError("");
        localStorage.setItem("token", res.data.access_token);
      })
      .catch((err) => setError(err.response.data.detail));
  };

  const register = (account) => {
    authApi.register(account).then((res) => console.log(res));
  };

  return { login, register, error };
};
