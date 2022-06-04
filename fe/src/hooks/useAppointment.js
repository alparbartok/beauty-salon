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

  return { appointment: state, error };
};

export const useOwnAppointments = (refresh) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    appointmentApi
      .getAppointments()
      .then(({ data }) => setState(data))
      .catch((e) => console.error(e));
  }, [refresh]);

  return state;
};
