import { useState } from "react";
import { useParams } from "react-router-dom";
import { AppointmentSearch, NewAppointment } from "./";

import style from "./Appointments.module.scss";

export const Appointments = () => {
  const params = useParams();
  const [activeTab, setActiveTab] = useState(!params?.code);

  return (
    <div className={style.mainWrapper}>
      <div className={style.tabButtonWrapper}>
        <button
          className={`${style.tabButton} ${activeTab && style.tabButtonActive}`}
          onClick={() => setActiveTab(true)}
        >
          Create appointment
        </button>
        <button
          className={`${style.tabButton} ${
            !activeTab && style.tabButtonActive
          }`}
          onClick={() => setActiveTab(false)}
        >
          Search appointment
        </button>
      </div>
      {activeTab ? <NewAppointment /> : <AppointmentSearch />}
    </div>
  );
};
