import { AiOutlinePlusCircle } from "react-icons/ai";
import style from "./AppointmentButton.module.scss";

const AppointmentButton = () => {
  return (
    <div className={style.wrapper}>
      <button className={style.button}>
        <AiOutlinePlusCircle color="white"/>
        <label>I want an appointment</label>
      </button>
    </div>
  );
};

export default AppointmentButton;
