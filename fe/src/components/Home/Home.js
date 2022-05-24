import photo1 from "../../assets/difference.jpg";
import photo2 from "../../assets/lash.jpg";
import photo3 from "../../assets/packets.jpg";
import photo4 from "../../assets/prices.jpg";
import photo5 from "../../assets/types.jpg";
import photo6 from "../../assets/epliare.jpg";
import style from "./Home.module.scss";

const Home = () => {
  return (
    <div className={style.wrapper}>
      <section className={style.section}>
        <img className={style.image} src={photo2} alt="" />
        <label>
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash
          lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash
          lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash
        </label>
        <img className={style.image} src={photo1} alt="" />
      </section>
      <section className={style.section}>
        <img className={style.image} src={photo5} alt="" />
        <label>
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash
          lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash
          lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash
        </label>
        <img className={style.image} src={photo3} alt="" />
      </section>
      <section className={style.section}>
      <img className={style.image} src={photo6} alt="" />
        <label>
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash
          lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash
          lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash lash
          Lash lash lash Lash lash lash Lash lash lash Lash lash lash Lash lash
          lash Lash lash lash Lash lash lash Lash lash lash
        </label>
        <img className={style.image} src={photo4} alt="" />
      </section>
    </div>
  );
};

export default Home;
