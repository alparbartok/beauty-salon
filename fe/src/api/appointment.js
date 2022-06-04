import { client } from "./axiosClient";

export const appointmentApi = {
  createAppointment: (appointment) => client.post("/appointment", appointment),
};
