import { NavLink, useLocation, useNavigate } from "react-router-dom";
import style from "./Header.module.scss";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { useRef, useState } from "react";

const Header = () => {
  const location = useLocation();
  const loginRef = useRef();
  const registerRef = useRef();
  const [access_code, setAccessCode] = useState("");
  const navigate = useNavigate();

  return (
    <div className={style.wrapper}>
      <div
        className={style.logoWrapper}
        style={{
          visibility: location.pathname.includes("/appointments")
            ? "hidden"
            : "visible",
        }}
      >
        <input
          className={style.codeInput}
          placeholder="Appointment code"
          onChange={(v) => setAccessCode(v.currentTarget.value)}
        />
        <button
          className={style.searchButton}
          onClick={() => navigate(`/appointments/${access_code}`)}
        >
          search
        </button>
      </div>
      <img
        className={style.image}
        src="https://thumbs.dreamstime.com/b/golden-beauty-salon-logo-illustration-beautiful-salons-woman-face-hairstyles-glitter-color-black-background-228490013.jpg"
        alt=""
      />
      <div className={style.logoWrapper}>
        <NavLink
          className={({ isActive }) =>
            isActive ? style.activeLink : style.link
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? style.activeLink : style.link
          }
          to="/appointments"
        >
          Appointments
        </NavLink>
        <Login ref={loginRef} registerRef={registerRef} />
        <Register ref={registerRef} loginRef={loginRef} />
      </div>
    </div>
  );
};

export default Header;
