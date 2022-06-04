import { client } from "./axiosClient";

export const appointmentApi = {
  createAppointment: (appointment) => client.post("/appointment", appointment),
  getAppointmentByCode: (code) => client.get(`/appointment/${code}`),
  deleteAppointments: (code) => client.delete(`/appointment/${code}`),
};
