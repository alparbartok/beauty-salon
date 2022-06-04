import { useState } from "react";
import { appointmentApi } from "../../api/appointment";
import { useOwnAppointments } from "../../hooks/useAppointment";
import { useAuth } from "../../hooks/useAuth";
import { Modal } from "../Shared/Modal/Modal";
import style from "./Appointments.module.scss";

export const AppointmentList = () => {
  const { user } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const appointments = useOwnAppointments(refresh);
  const [reject, setReject] = useState({
    reason: "",
    access_code: "",
  });

  const handleConfirm = (code) => {
    appointmentApi
      .confirmAppointment(code)
      .then(() => setRefresh(!refresh))
      .catch((e) => console.error(e));
  };

  const handleDelete = (code) => {
    appointmentApi
      .deleteAppointments(code)
      .then(() => setRefresh(!refresh))
      .catch((e) => console.error(e));
  };

  const handleReject = () => {
    appointmentApi
      .rejectAppointment(reject.access_code, reject.reason)
      .then(() => {
        setReject({ access_code: "", reason: "" });
        setRefresh(!refresh);
      });
  };

  return (
    <>
      <Modal open={!!reject.access_code}>
        <div style={{ paddingBottom: "1rem" }}>
          <h2
            style={{ borderBottom: ".1rem solid pink", paddingBottom: "1rem" }}
          >
            Reject appointment
          </h2>
          <input
            placeholder="Reason"
            className={style.textInput}
            onChange={(v) =>
              setReject({ ...reject, reason: v.currentTarget.value })
            }
          />
          <button
            onClick={handleReject}
            className={`${style.button} ${style.rejectButton}`}
          >
            Reject
          </button>
        </div>
      </Modal>
      <div className={style.listWrapper}>
        {appointments.map((el, i) => (
          <div className={style.listElementWrapper}>
            <div className={style.listElement}>
              <label>Client's details</label>
              <div className={style.fieldWrapper}>
                <label>Name:</label>
                <label>{el.name}</label>
              </div>
              <div className={style.fieldWrapper}>
                <label>E-mail address:</label>
                <label>{el.email}</label>
              </div>
              <div className={style.fieldWrapper}>
                <label>Phone number:</label>
                <label>{el.phone_number || "-"}</label>
              </div>
            </div>
            <div className={style.listElement}>
              <label>Appointment details</label>
              <div className={style.fieldWrapper}>
                <label>Access code:</label>
                <label>{el.access_code}</label>
              </div>
              <div className={style.fieldWrapper}>
                <label>Service:</label>
                <label>{el.service}</label>
              </div>
              <div className={style.fieldWrapper}>
                <label>Employee:</label>
                <label>{el.worker}</label>
              </div>
              <div className={style.fieldWrapper}>
                <label>Status:</label>
                <label>{el.status}</label>
              </div>
              <div className={style.fieldWrapper}>
                <label>Price:</label>
                <label>{el.price}</label>
              </div>
            </div>
            <div className={style.buttonWrapper}>
              {user.user_type === 1 && el.status === "pending" && (
                <button
                  onClick={() =>
                    setReject({ ...reject, access_code: el.access_code })
                  }
                  className={`${style.button} ${style.rejectButton}`}
                >
                  Reject
                </button>
              )}
              {user.user_type === 2 && (
                <button
                  onClick={() => handleDelete(el.access_code)}
                  className={`${style.button} ${style.rejectButton}`}
                >
                  Delete
                </button>
              )}
              {user.user_type === 1 && el.status === "pending" && (
                <button
                  onClick={() => handleConfirm(el.access_code)}
                  className={`${style.button} ${style.confirmButton}`}
                >
                  Confirm
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
