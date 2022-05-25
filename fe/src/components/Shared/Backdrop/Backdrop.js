import style from "./Backdrop.module.scss";

export const Backdrop = ({ children }) => (
  <div className={style.wrapper}>{children}</div>
);
