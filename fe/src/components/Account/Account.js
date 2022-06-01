import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useMyUser, useUserTypes } from "../../hooks/useUser";
import { AppointmentList } from "../Appointments/AppointmentList";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";

import style from "./Account.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { userApi } from "../../api/user";
import { format } from "date-fns";

export const Account = () => {
  const { user } = useMyUser();

  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    first_name: user?.first_name,
    last_name: user?.last_name,
    birth_date: user?.birth_date,
    phone_number: user?.phone_number,
    email: user?.email,
  });
  const { user_types } = useUserTypes();
  const { logged } = useAuth();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    !logged && navigate('/');
  }, [logged]);

  useEffect(() => {
    reset(user);
  }, [user]);

  if (!user) {
    return null;
  }

  const onSubmit = (user) => {
    userApi
      .updateUser(user.id, {
        ...user,
        birth_date: user.birth_date
          ? format(user.birth_date, "yyyy-MM-dd")
          : null,
        phone_number: user.phone_number || null,
      })
      .then(({ data }) => {
        reset(data);
        setIsEdit(false);
      })
      .catch((e) => console.error(e));
  };

  const handleDelete = () => {
    userApi.deleteUser(user.id).then(() => navigate("/"));
  };

  return (
    <div className={style.wrapper}>
      <form className={style.accountWrapper} onSubmit={handleSubmit(onSubmit)}>
        <h1>Account details</h1>
        <div className={style.lineWrapper}>
          <label>First name:</label>
          <div className={`${style.fieldWrapper} ${style.inputWrapper}`}>
            <input
              className={`${style.input} ${!isEdit && style.inputHidden}`}
              placeholder="-"
              {...register("first_name", {
                required: "This field is required",
              })}
            />
            {errors?.first_name && (
              <label className={style.errorMessage}>
                {errors?.first_name?.message}
              </label>
            )}
          </div>
        </div>
        <div className={style.lineWrapper}>
          <label>Last name:</label>
          <div className={`${style.fieldWrapper} ${style.inputWrapper}`}>
            <input
              className={`${style.input} ${!isEdit && style.inputHidden}`}
              placeholder="-"
              {...register("last_name", { required: "This field is required" })}
            />
            {errors?.last_name && (
              <label className={style.errorMessage}>
                {errors?.last_name?.message}
              </label>
            )}
          </div>
        </div>
        <div className={style.lineWrapper}>
          <label>E-mail address:</label>
          <div className={`${style.fieldWrapper} ${style.inputWrapper}`}>
            <input
              className={`${style.input} ${!isEdit && style.inputHidden}`}
              placeholder="-"
              {...register("email", { required: "This field is required" })}
            />
            {errors?.email && (
              <label className={style.errorMessage}>
                {errors?.email?.message}
              </label>
            )}
          </div>
        </div>
        <div className={style.lineWrapper}>
          <label>Phone number:</label>
          <div className={`${style.fieldWrapper} ${style.inputWrapper}`}>
            <input
              className={`${style.input} ${!isEdit && style.inputHidden}`}
              placeholder="-"
              {...register("phone_number")}
            />
          </div>
        </div>
        <div className={style.lineWrapper}>
          <label>Birth date:</label>
          <div className={`${style.fieldWrapper} ${style.inputWrapper}`}>
            <Controller
              control={control}
              name="birth_date"
              render={({ field: { value, ...rest } }) => (
                <DatePicker
                  {...rest}
                  selected={value}
                  placeholderText="-"
                  className={`${style.input} ${style.inputWrapper} ${
                    !isEdit && style.inputHidden
                  }`}
                  wrapperClassName={style.test}
                />
              )}
            />
          </div>
        </div>
        <div className={style.lineWrapper}>
          <label>User type:</label>
          <div className={`${style.fieldWrapper} ${style.inputWrapper}`}>
            <label className={`${style.input} ${style.inputHidden}`}>
              {user_types[user.user_type]?.type || "-"}
            </label>
          </div>
        </div>
        <div
          className={style.buttonWrapper}
          style={{ display: isEdit ? "flex" : "none" }}
        >
          <button
            className={`${style.button} ${style.cancelButton}`}
            type="button"
            onClick={() => {
              reset(user);
              setIsEdit(false);
            }}
          >
            Cancel
          </button>
          <button
            className={`${style.button} ${style.saveButton}`}
            type="submit"
          >
            Save
          </button>
        </div>
        <div
          className={style.buttonWrapper}
          style={{ display: isEdit ? "none" : "flex" }}
        >
          <button
            className={`${style.button} ${style.cancelButton}`}
            onClick={handleDelete}
            type="button"
          >
            Delete account
          </button>
          <button
            className={`${style.button} ${style.editButton}`}
            onClick={() => setIsEdit(true)}
            type="button"
          >
            Edit account
          </button>
        </div>
      </form>
      <AppointmentList />
    </div>
  );
};
