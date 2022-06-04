import style from "./Modal.module.scss";

export const Modal = ({ children, open }) =>
  open ? (
    <div className={style.backdrop}>
      <div className={style.wrapper}>{children}</div>
    </div>
  ) : null;
