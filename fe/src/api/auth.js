import { client } from "./axiosClient";

export const authApi = {
  login: (data) => client.post("/login", data),
  register: (data) => client.post("/register", data),
};
