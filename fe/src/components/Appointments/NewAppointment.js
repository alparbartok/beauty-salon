import {
  useServiceTypes,
  useServices,
  useWorkers,
  useAvailablePeriods,
} from "../../hooks/usePopulator";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import DatePicker from "react-datepicker";

import style from "./Appointments.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { appointmentApi } from "../../api/appointment";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { AppointmentConfirmation } from "./AppointmentConfirmation";

export const NewAppointment = () => {
  const [confirmation, setConfirmation] = useState();
  const { logged } = useAuth();
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
    register,
    reset,
  } = useForm({
    appointment_date: null,
    service_type: "",
    worker_id: "",
    service: "",
    appointment_time: "",
    name: "",
    email: "",
    phone_number: "",
  });

  const serviceTypes = useServiceTypes();
  const employees = useWorkers();
  const services = useServices(watch("service_type"));
  const availablePeriods = useAvailablePeriods(watch("worker_id"), {
    appointment_date:
      watch("appointment_date") &&
      format(watch("appointment_date"), "yyyy-MM-dd"),
    service_id: watch("service"),
  });

  const onSubmit = (appointment) => {
    appointmentApi
      .createAppointment({
        worker_id: appointment.worker_id,
        service: appointment.service,
        date: `${format(appointment.appointment_date, "yyyy-MM-dd")} ${
          appointment.appointment_time
        }`,
        name: appointment.name,
        email: appointment.email,
        phone_number: appointment.phone_number,
      })
      .then(({ data }) => {
        setConfirmation(data);
        reset();
      });
  };

  if (confirmation) {
    return (
      <AppointmentConfirmation
        data={confirmation}
        footer={
          <button
            onClick={() => setConfirmation(undefined)}
            className={style.deleteButton}
          >
            Back
          </button>
        }
      />
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formWrapper}>
      <h1>{logged ? "New Appointment" : "New Guest Appointment"}</h1>
      {!logged && (
        <div className={style.guestForm}>
          <label className={style.topSeparator}>Guest identify</label>
          <div className={style.flexColumn}>
            <input
              className={style.textInput}
              placeholder="Name"
              {...register("name", {
                required: logged ? undefined : "This field is required",
              })}
            />
            {errors?.name && (
              <label className={style.errorMessage}>
                {errors.name.message}
              </label>
            )}
          </div>
          <div className={style.flexColumn}>
            <input
              className={style.textInput}
              placeholder="E-mail address"
              {...register("email", {
                required: logged ? undefined : "This field is required",
              })}
            />
            {errors?.email && (
              <label className={style.errorMessage}>
                {errors.email.message}
              </label>
            )}
          </div>
          <div className={style.flexColumn}>
            <input
              className={style.textInput}
              placeholder="Phone number"
              {...register("phone_number", {
                required: logged ? undefined : "This field is required",
              })}
            />
            {errors?.email && (
              <label className={style.errorMessage}>
                {errors.email.message}
              </label>
            )}
          </div>
          <label className={style.bottomSeparator}>Appointment</label>
        </div>
      )}
      <Controller
        name="service_type"
        control={control}
        rules={{ required: "This field is required!" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className={style.flexColumn}>
            <Select
              options={serviceTypes}
              placeholder="Appointment type"
              onChange={(v) => {
                onChange(v.value);
                setValue("appointment_time", "");
              }}
              onBlur={onBlur}
              value={serviceTypes.find((v) => value === v.value)}
              className={style.select}
            />
            {errors?.service_type && (
              <label className={style.errorMessage}>
                {errors.service_type.message}
              </label>
            )}
          </div>
        )}
      />
      <Controller
        name="worker_id"
        control={control}
        rules={{ required: "This field is required!" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className={style.flexColumn}>
            <Select
              options={employees}
              placeholder="Employee"
              onBlur={onBlur}
              onChange={(v) => {
                onChange(v.value);
                setValue("appointment_time", "");
              }}
              value={employees.find((v) => value === v.value)}
              className={style.select}
            />
            {errors?.worker_id && (
              <label className={style.errorMessage}>
                {errors.worker_id.message}
              </label>
            )}
          </div>
        )}
      />
      <Controller
        name="appointment_date"
        control={control}
        rules={{ required: "This field is required!" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className={style.flexColumn}>
            <DatePicker
              onChange={(v) => {
                onChange(v);
                setValue("appointment_time", "");
              }}
              onBlur={onBlur}
              selected={value}
              dateFormat="dd.MM.yyyy"
              className={style.textInput}
              placeholderText="Date"
            />
            {errors?.appointment_date && (
              <label className={style.errorMessage}>
                {errors.appointment_date.message}
              </label>
            )}
          </div>
        )}
      />
      <Controller
        name="service"
        control={control}
        rules={{ required: "This field is required!" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className={style.flexColumn}>
            <Select
              options={services}
              placeholder={
                services.length > 0 ? "Service" : "No available services"
              }
              isDisabled={!services.length}
              onBlur={onBlur}
              onChange={(v) => {
                onChange(v.value);
                setValue("appointment_time", "");
              }}
              value={services.find((v) => value === v.value)}
              className={style.select}
            />
            {errors?.service && (
              <label className={style.errorMessage}>
                {errors.service.message}
              </label>
            )}
          </div>
        )}
      />
      <Controller
        name="appointment_time"
        control={control}
        rules={{ required: "This field is required!" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <div className={style.flexColumn}>
            <Select
              options={availablePeriods}
              key={watch("appointment_time")}
              isDisabled={!availablePeriods.length}
              menuPlacement="auto"
              placeholder={
                availablePeriods.length > 0 ? "Time" : "No available periods"
              }
              onBlur={onBlur}
              onChange={(v) => onChange(v.value)}
              value={availablePeriods.find((v) => value === v.value)}
              className={style.select}
            />
            {errors?.appointment_time && (
              <label className={style.errorMessage}>
                {errors.appointment_time.message}
              </label>
            )}
          </div>
        )}
      />
      <button className={style.submitButton}>Book appointment</button>
    </form>
  );
};
