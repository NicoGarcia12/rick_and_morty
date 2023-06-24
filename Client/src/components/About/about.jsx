import video from "../../images/rm2.mp4";
import style from "./about.module.css";
export default function About() {
  return (
    <div>
      <div className={style.fondo}>
        <video autoPlay loop muted playbackRate={0.5} id="videoFondo">
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className={style.aboutContainer}>
        <div className={style.leftSection}></div>
        <div className={style.rightSection}>
          <h1>Nombre: Nicolas Garcia</h1>
          <h2>Especie: Human</h2>
          <h2>Género: Male</h2>
          <h2>Origen: Earth (37-a)</h2>
          <h2>Estado: Alive</h2>
        </div>
      </div>
    </div>
  );
}
