import { NavLink } from "react-router-dom";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.logoWrapper}>
        <img
          className={style.image}
          src="https://thumbs.dreamstime.com/b/golden-beauty-salon-logo-illustration-beautiful-salons-woman-face-hairstyles-glitter-color-black-background-228490013.jpg"
          alt=""
          style={{ backgroundColor: "red" }}
        />
        <div>
          <input className={style.codeInput} placeholder="Appointment code" />
          <button className={style.searchButton}>search</button>
        </div>
      </div>
      <div>
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
          to="/contact"
        >
          Contact
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? style.activeLink : style.link
          }
          to="/account"
        >
          Account
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
