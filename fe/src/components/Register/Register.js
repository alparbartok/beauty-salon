import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Controller, get, useForm } from "react-hook-form";
import { CgClose } from "react-icons/cg";
import { useAuth } from "../../hooks/useAuth";
import { Modal } from "../Shared/Modal/Modal";
import style from "./Register.module.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export const Register = forwardRef(({ loginRef }, ref) => {
  const [open, setOpen] = useState(false);
  const { register, error } = useAuth({
    email: "",
    first_name: "",
    last_name: "",
    birth_date: null,
    phone_number: "",
    password: "",
    confirm_password: "",
  });
  const formFields = useForm();

  useEffect(() => {
    if (!open) {
      formFields.reset();
    }
  }, [open]);

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  const onSubmit = ({ confirm_password, ...rest }) => {
    register({
      ...rest,
      birth_date: rest.birth_date
        ? format(rest.birth_date, "yyyy-MM-dd")
        : null,
      phone_number: rest.phone_number || null,
    });
  };

  return (
    <Modal open={open}>
      <form
        onSubmit={formFields.handleSubmit(onSubmit)}
        className={`${style.loginWrapper} ${error && style.errorLoginWrapper}`}
      >
        <button className={style.closeButton} onClick={() => setOpen(false)}>
          <CgClose />
        </button>
        <h1>Register</h1>
        <div className={style.fieldWrapper}>
          <label>E-mail: address</label>
          <input
            className={`${style.loginInput} ${
              formFields.formState.errors?.email && style.loginErrorInput
            }`}
            {...formFields.register("email", {
              required: "This field is required",
            })}
          />
          {formFields.formState.errors?.email && (
            <label className={style.errorMessage}>
              {formFields.formState.errors.email.message}
            </label>
          )}
        </div>
        <div className={style.fieldWrapper}>
          <label>First name:</label>
          <input
            className={`${style.loginInput} ${
              formFields.formState.errors?.email && style.loginErrorInput
            }`}
            {...formFields.register("first_name", {
              required: "This field is required",
            })}
          />
          {formFields.formState.errors?.first_name && (
            <label className={style.errorMessage}>
              {formFields.formState.errors.first_name.message}
            </label>
          )}
        </div>
        <div className={style.fieldWrapper}>
          <label>Last name:</label>
          <input
            className={`${style.loginInput} ${
              formFields.formState.errors?.email && style.loginErrorInput
            }`}
            {...formFields.register("last_name", {
              required: "This field is required",
            })}
          />
          {formFields.formState.errors?.last_name && (
            <label className={style.errorMessage}>
              {formFields.formState.errors.last_name.message}
            </label>
          )}
        </div>
        <div className={style.fieldWrapper}>
          <label>Birth date:</label>
          <Controller
            name="birth_date"
            control={formFields.control}
            render={({ field: { value, onChange, onBlur } }) => (
              <DatePicker
                onBlur={onBlur}
                onChange={onChange}
                className={style.loginInput}
                selected={value}
                dateFormat="dd.MM.yyyy"
              />
            )}
          />
        </div>
        <div className={style.fieldWrapper}>
          <label>Phone number:</label>
          <input
            className={style.loginInput}
            {...formFields.register("phone_number")}
          />
        </div>
        <div className={style.fieldWrapper}>
          <label>Password:</label>
          <input
            type="password"
            className={`${style.loginInput} ${
              formFields.formState.errors?.password && style.loginErrorInput
            }`}
            {...formFields.register("password", {
              required: "This field is required",
            })}
          />
          {formFields.formState.errors?.password && (
            <label className={style.errorMessage}>
              {formFields.formState.errors?.password.message}
            </label>
          )}
        </div>
        <div className={style.fieldWrapper}>
          <label>Confirm password:</label>
          <input
            type="password"
            className={`${style.loginInput} ${
              formFields.errors?.confirm_password && style.loginErrorInput
            }`}
            {...formFields.register("confirm_password", {
              required: "This field is required",
              validate: (v) =>
                formFields.getValues()?.password === v
                  ? true
                  : "Must match the password!",
            })}
          />
          {formFields.formState.errors?.confirm_password && (
            <label className={style.errorMessage}>
              {formFields.formState.errors?.confirm_password.message}
            </label>
          )}
        </div>
        <div className={style.buttonWrapper}>
          <button
            className={style.loginButton}
            onClick={() => {
              setOpen(false);
              loginRef.current.setOpen(true);
            }}
          >
            Login
          </button>
          <button className={style.loginButton} type="submit">
            Register
          </button>
        </div>
      </form>
    </Modal>
  );
});
