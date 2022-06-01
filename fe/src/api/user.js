import { client } from "./axiosClient";

export const userApi = {
  getClients: () => client.get("/user/clients"),
  getWorkers: () => client.get("/user/workers"),
  getMe: () => client.get("/user/me"),
  getUserTypes: () => client.get("/user/types"),
  getUser: (user_id) => client.get(`/user/${user_id}`),
  updateUser: (user_id, user) => client.put(`/user/${user_id}`, user),
  deleteUser: (user_id) => client.delete(`/user/${user_id}`),
};
