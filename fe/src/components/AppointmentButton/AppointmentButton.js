import { AiOutlinePlusCircle } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import style from "./AppointmentButton.module.scss";

const AppointmentButton = () => {
  const { pathname } = useLocation();

  if (pathname === "/appointments") {
    return null;
  }

  return (
    <button className={style.button}>
      <AiOutlinePlusCircle />
      <label>I want an appointment</label>
    </button>
  );
};

export default AppointmentButton;
