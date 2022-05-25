import { Backdrop } from "../Backdrop/Backdrop";
import style from "./Modal.module.scss";

export const Modal = ({ children, open }) =>
  open ? (
    <Backdrop>
      <div className={style.wrapper}>{children}</div>
    </Backdrop>
  ) : null;
