import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "../Shared/Modal/Modal";
import { useAuth } from "../../hooks/useAuth";
import { BsPersonCircle } from "react-icons/bs";
import style from "./Login.module.scss";
import { CgClose } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

export const Login = forwardRef(({ registerRef }, ref) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { login, error, setError, user, logged } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    email: "",
    password: "",
  });

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  const onSubmit = async (data) => {
    try {
      await login(data);
      setOpen(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!open) {
      reset();
      setError("");
    }
  }, [open]);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${style.loginWrapper} ${
            error && style.errorLoginWrapper
          }`}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className={style.closeButton}
          >
            <CgClose />
          </button>
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
            <button
              type="button"
              className={style.loginButton}
              onClick={() => {
                setOpen(false);
                registerRef.current.setOpen(true);
              }}
            >
              Register
            </button>
            <button className={style.loginButton} type="submit">
              Login
            </button>
          </div>
        </form>
      </Modal>
      <>
        <div
          className={style.loginIcon}
          onClick={() => {
            logged ? navigate("account") : setOpen(true);
          }}
        >
          <BsPersonCircle />
          {user && (
            <label>
              {user.first_name} {user.last_name}
            </label>
          )}
        </div>
        {logged && <MdLogout className={style.logoutIcon} />}
      </>
    </>
  );
});
