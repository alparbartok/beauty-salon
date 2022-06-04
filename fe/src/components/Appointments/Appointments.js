import { useState } from "react";
import { Appointment, NewAppointment } from "./";

import style from "./Appointments.module.scss";

export const Appointments = () => {
  const [activeTab, setActiveTab] = useState(true);

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
      {activeTab ? <NewAppointment /> : <Appointment />}
    </div>
  );
};
