import style from "./Appointments.module.scss";

export const AppointmentConfirmation = ({ data, onClose }) => (
  <div className={style.formWrapper}>
    <h1>Booked appointment's full details</h1>
    <div className={style.confirmationWrapper}>
      <label>Your details</label>
      <div className={style.fieldWrapper}>
        <label>Name:</label>
        <label>{data.name}</label>
      </div>
      <div className={style.fieldWrapper}>
        <label>E-mail address:</label>
        <label>{data.email}</label>
      </div>
      <div className={style.fieldWrapper}>
        <label>Phone number:</label>
        <label>{data.phone_number || "-"}</label>
      </div>
    </div>
    <div className={style.confirmationWrapper}>
      <label>Appointment details</label>
      <div className={style.fieldWrapper}>
        <label>Access code:</label>
        <label>{data.access_code}</label>
      </div>
      <div className={style.fieldWrapper}>
        <label>Service:</label>
        <label>{data.service}</label>
      </div>
      <div className={style.fieldWrapper}>
        <label>Employee:</label>
        <label>{data.worker}</label>
      </div>
      <div className={style.fieldWrapper}>
        <label>Status:</label>
        <label>{data.status}</label>
      </div>
      <div className={style.fieldWrapper}>
        <label>Price:</label>
        <label>{data.price}</label>
      </div>
    </div>
    <button onClick={onClose} className={style.deleteButton}>
      Back
    </button>
  </div>
);
