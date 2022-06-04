import { NavLink } from "react-router-dom";
import style from "./Header.module.scss";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { useRef } from "react";

const Header = () => {
  const loginRef = useRef();
  const registerRef = useRef();

  return (
    <div className={style.wrapper}>
      <div className={style.logoWrapper}>
        <input className={style.codeInput} placeholder="Appointment code" />
        <button className={style.searchButton}>search</button>
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
