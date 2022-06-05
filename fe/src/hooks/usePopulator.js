import { useEffect, useState } from "react";
import { populatorApi } from "../api/populator";

export const useServiceTypes = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    populatorApi
      .getServiceTypes()
      .then(({ data }) => setState(data))
      .catch((e) => console.error(e));
  }, []);

  return state;
};

export const useServices = (type) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    if (type) {
      populatorApi
        .getServicePopulator(type)
        .then(({ data }) => setState(data))
        .catch((e) => console.error(e));
    }
  }, [type]);

  return [state, () => setState([])];
};

export const useWorkers = () => {
  const [state, setState] = useState([]);

  useEffect(() => {
    populatorApi
      .getWorkers()
      .then(({ data }) => setState(data))
      .catch((e) => console.error(e));
  }, []);

  return state;
};

export const useAvailablePeriods = (worker_id, appointment) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    if (
      worker_id >= 0 &&
      appointment?.service_id &&
      appointment?.appointment_date
    ) {
      populatorApi
        .getAvailablePeriods(worker_id, appointment)
        .then(({ data }) =>
          setState(data.map((el) => ({ label: el, value: el })))
        )
        .catch((e) => console.error(e));
    }
  }, [worker_id, JSON.stringify(appointment)]);

  return [state, () => setState([])];
};
