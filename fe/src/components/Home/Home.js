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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          tristique, massa id viverra venenatis, tellus leo imperdiet arcu, ac
          fermentum sapien enim eu tellus. Nam at nunc quam. Quisque sit amet
          eleifend libero, nec tincidunt odio. Donec imperdiet, lectus ac
          imperdiet mattis, erat arcu scelerisque turpis, vel dapibus urna nibh
          et sem. Donec mauris leo, pulvinar id egestas ut, volutpat ac tellus.
          Proin interdum luctus sollicitudin. Donec vestibulum vehicula justo
          efficitur volutpat. Ut dapibus non elit vitae convallis. Phasellus
          ornare, ante nec consectetur convallis, ante lectus bibendum orci, et
          porta mauris tellus id libero. Curabitur vel tincidunt justo, ut
          tempor arcu. In malesuada nec libero ultrices vehicula. Vestibulum
          vitae arcu in magna aliquam pulvinar. Aliquam odio leo, consequat at
          tempor nec, auctor a sem. Cras dapibus tempus erat. Nunc elit libero,
          facilisis quis pulvinar nec, pharetra eget felis. Ut nec enim sapien.
        </label>
        <img className={style.image} src={photo1} alt="" />
      </section>
      <section className={style.section}>
        <img className={style.image} src={photo5} alt="" />
        <label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          tristique, massa id viverra venenatis, tellus leo imperdiet arcu, ac
          fermentum sapien enim eu tellus. Nam at nunc quam. Quisque sit amet
          eleifend libero, nec tincidunt odio. Donec imperdiet, lectus ac
          imperdiet mattis, erat arcu scelerisque turpis, vel dapibus urna nibh
          et sem. Donec mauris leo, pulvinar id egestas ut, volutpat ac tellus.
          Proin interdum luctus sollicitudin. Donec vestibulum vehicula justo
          efficitur volutpat. Ut dapibus non elit vitae convallis. Phasellus
          ornare, ante nec consectetur convallis, ante lectus bibendum orci, et
          porta mauris tellus id libero. Curabitur vel tincidunt justo, ut
          tempor arcu. In malesuada nec libero ultrices vehicula. Vestibulum
          vitae arcu in magna aliquam pulvinar. Aliquam odio leo, consequat at
          tempor nec, auctor a sem. Cras dapibus tempus erat. Nunc elit libero,
          facilisis quis pulvinar nec, pharetra eget felis. Ut nec enim sapien.
        </label>
        <img className={style.image} src={photo3} alt="" />
      </section>
      <section className={style.section}>
        <img className={style.image} src={photo6} alt="" />
        <label>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          tristique, massa id viverra venenatis, tellus leo imperdiet arcu, ac
          fermentum sapien enim eu tellus. Nam at nunc quam. Quisque sit amet
          eleifend libero, nec tincidunt odio. Donec imperdiet, lectus ac
          imperdiet mattis, erat arcu scelerisque turpis, vel dapibus urna nibh
          et sem. Donec mauris leo, pulvinar id egestas ut, volutpat ac tellus.
          Proin interdum luctus sollicitudin. Donec vestibulum vehicula justo
          efficitur volutpat. Ut dapibus non elit vitae convallis. Phasellus
          ornare, ante nec consectetur convallis, ante lectus bibendum orci, et
          porta mauris tellus id libero. Curabitur vel tincidunt justo, ut
          tempor arcu. In malesuada nec libero ultrices vehicula. Vestibulum
          vitae arcu in magna aliquam pulvinar. Aliquam odio leo, consequat at
          tempor nec, auctor a sem. Cras dapibus tempus erat. Nunc elit libero,
          facilisis quis pulvinar nec, pharetra eget felis. Ut nec enim sapien.
        </label>
        <img className={style.image} src={photo4} alt="" />
      </section>
    </div>
  );
};

export default Home;
