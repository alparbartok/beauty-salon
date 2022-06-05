import { useNavigate } from "react-router-dom";
import { appointmentApi } from "../../api/appointment";
import { useAppointments } from "../../hooks/useAppointment";
import { AppointmentConfirmation } from "./";
import style from "./Appointments.module.scss";

export const Appointment = ({ access_code, onBack }) => {
  const { appointment, error } = useAppointments(access_code);
  const navigate = useNavigate();

  const handleDelete = () => {
    appointmentApi
      .deleteAppointments(access_code)
      .then(() => navigate("/"))
      .catch((e) => console.error(e));
  };

  if (error === 404) {
    return (
      <div className={style.formWrapper} style={{ textAlign: "center" }}>
        <h1>We encountered an issue</h1>
        <p style={{ fontWeight: 700, fontSize: "1.2rem" }}>
          Appointment with code{" "}
          <label
            style={{
              backgroundColor: "pink",
              padding: ".2rem .5rem",
              borderRadius: ".3rem",
            }}
          >
            {access_code}
          </label>{" "}
          doesn't exists, please check you code
        </p>
        <button onClick={onBack} className={style.deleteButton}>
          Back
        </button>
      </div>
    );
  }

  if (!appointment) {
    return null;
  }

  return (
    <AppointmentConfirmation
      data={appointment}
      footer={
        <div className={style.buttonWrapper}>
          <button className={style.submitButton} onClick={onBack}>
            Back
          </button>
          <button className={style.deleteButton} onClick={handleDelete}>
            Delete
          </button>
        </div>
      }
    />
  );
};
