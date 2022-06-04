import { AiOutlinePlusCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import style from "./AppointmentButton.module.scss";

const AppointmentButton = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate()

  if (pathname === "/appointments") {
    return null;
  }

  return (
    <button className={style.button} onClick={() => navigate('/appointments')}>
      <AiOutlinePlusCircle />
      <label>I want an appointment</label>
    </button>
  );
};

export default AppointmentButton;
