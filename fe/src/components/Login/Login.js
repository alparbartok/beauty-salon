import { useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../Shared/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";
import { BsPersonCircle } from "react-icons/bs";
import style from "./Login.module.scss";

export const Login = () => {
  const [open, setOpen] = useState(false);
  const { login, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (data) => {
    login(data);
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.loginWrapper} ${
            error && style.errorLoginWrapper
          }`}
        >
          <h1>Login</h1>
          {error && <p className={style.wrongCredentials}>{error}</p>}
          <div className={style.fieldWrapper}>
            <label>E-mail address:</label>
            <input
              className={`${style.loginInput} ${
                errors?.email && style.loginErrorInput
              }`}
              {...register("email", { required: "This field is required" })}
            />
            {errors?.email && (
              <label className={style.errorMessage}>
                {errors.email.message}
              </label>
            )}
          </div>
          <div className={style.fieldWrapper}>
            <label>Password:</label>
            <input
              className={`${style.loginInput} ${
                errors?.email && style.loginErrorInput
              }`}
              {...register("password", { required: "This field is required" })}
              type="password"
            />
            {errors?.password && (
              <label className={style.errorMessage}>
                {errors.password.message}
              </label>
            )}
          </div>
          <div className={style.buttonWrapper}>
            <button className={style.loginButton}>
              Register
            </button>
            <button className={style.loginButton} type="submit">
              Login
            </button>
          </div>
        </form>
      </Modal>
      <BsPersonCircle
        className={style.loginIcon}
        onClick={() => setOpen(true)}
      />
    </>
  );
};
