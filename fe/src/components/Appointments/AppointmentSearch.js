import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Appointment } from "./";
import style from "./Appointments.module.scss";

export const AppointmentSearch = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [access_code, setAccessCode] = useState(params?.code || "");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ code: "" });

  const onSubmit = (data) => {
    setAccessCode(data.code);
  };

  return access_code ? (
    <Appointment
      access_code={access_code}
      onBack={() => {
        setAccessCode("");
        navigate("/appointments");
      }}
    />
  ) : (
    <form
      className={style.formWrapper}
      style={{ flexDirection: "row", justifyContent: "center" }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <input
          placeholder="Appointment code"
          className={style.textInput}
          {...register("code", { required: "This field is required" })}
        />
        {errors?.code && (
          <label className={style.errorMessage}>{errors.code.message}</label>
        )}
      </div>
      <button className={style.searchButton}>Search</button>
    </form>
  );
};
