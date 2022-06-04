import { client } from "./axiosClient";

export const appointmentApi = {
  createAppointment: (appointment) => client.post("/appointment", appointment),
  getAppointmentByCode: (code) => client.get(`/appointment/${code}`),
  deleteAppointments: (code) => client.delete(`/appointment/${code}`),
  getAppointments: () => client.get("/appointment"),
  confirmAppointment: (code) => client.put(`/appointment/confirm/${code}`),
  rejectAppointment: (code, message) =>
    client.post(`/appointment/refuse/${code}?message=${message}`),
};
