import { client } from "./axiosClient";

export const populatorApi = {
  getServicePopulator: (type) => client.get(`/populator/services/${type}`),
  getWorkers: () => client.get("/populator/workers"),
  getServiceTypes: () => client.get("/populator/service-types"),
  getAvailablePeriods: (worker_id, appointment) =>
    client.post(`/populator/available-periods/${worker_id}`, appointment),
};
