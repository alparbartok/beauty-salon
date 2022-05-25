import axios from "axios";

export const client = axios.create({
  baseURL: "http://localhost:8000",
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = { ...config.headers, "X-token": token };
  }

  return config
});
