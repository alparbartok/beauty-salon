import { useEffect, useState } from "react";
import { appointmentApi } from "../api/appointment";

export const useAppointments = (code) => {
  const [state, setState] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    appointmentApi
      .getAppointmentByCode(code)
      .then(({ data }) => setState(data))
      .catch((e) => setError(e.response.status));
  }, [code]);

  return {appointment: state, error};
};
