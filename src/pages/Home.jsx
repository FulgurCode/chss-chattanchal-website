import React, { useRef } from "react";
import styles from "../styles/home/Home.module.css";
import card from "../styles/home/Carousel.module.css";
import { Link } from "react-router-dom";
import Carousel from "../components/home/Carousel";

import schoolImg1 from "../assets/images/home/school1.jpg";
import schoolImg2 from "../assets/images/home/school2.jpg";
import schoolImg3 from "../assets/images/home/school3.jpg";
import schoolImg4 from "../assets/images/home/school4.jpg";
import schoolImg5 from "../assets/images/home/school5.jpg";

export default function Home() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const historyRef = useRef(null);

  return (
    <div className={styles.body}>
      <input type="checkbox" id="checkbox" className={styles.checkbox}></input>
      <label className={styles.btn} htmlFor="checkbox">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <header className={styles.header}>
        <div>
          <Link
            onClick={() => {
              homeRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <code>Home</code>
          </Link>

          <Link to="#">
            <code>Events</code>
          </Link>
          <Link
            onClick={() => {
              galleryRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <code>Gallery</code>
          </Link>
          <Link
            onClick={() => {
              historyRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <code>History</code>
          </Link>
          <Link to="#">
            <code>About Us</code>
          </Link>
          <Link to="#">
            <code>Contact Us</code>
          </Link>
          <Link to="/login">
            <code>Login</code>
          </Link>
        </div>
      </header>
      <main className={styles.main} ref={homeRef}>
        <h1>
          <span>Welcome to</span>
          <br />
          <b>CHSS CHATTANCHAL</b>
        </h1>
      </main>
      <div className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        quibusdam asperiores quos perferendis laboriosam aliquid saepe
        voluptatibus excepturi exercitationem maxime necessitatibus, soluta
        reiciendis ea culpa rerum quaerat atque dicta provident. Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Doloremque fugiat eum id
        delectus amet eos sapiente quo dicta laborum nobis alias minima nesciunt
        similique sunt, placeat ad. Dicta, temporibus est. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Dolore, sequi voluptatibus quasi
        fuga, dolorum commodi voluptatum nulla impedit perferendis praesentium
        id nobis, fugit alias? Unde, debitis. Necessitatibus, est eaque. Iste.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
        quibusdam asperiores quos perferendis laboriosam aliquid saepe
        voluptatibus excepturi exercitationem maxime necessitatibus, soluta
        reiciendis ea culpa rerum quaerat atque dicta provident. Lorem ipsum
        dolor sit, amet consectetur adipisicing elit. Doloremque fugiat eum id
        delectus amet eos sapiente quo dicta laborum nobis alias minima nesciunt
        similique sunt, placeat ad. Dicta, temporibus est. Lorem ipsum, dolor
        sit amet consectetur adipisicing elit. Dolore, sequi voluptatibus quasi
        fuga, dolorum commodi voluptatum nulla impedit perferendis praesentium
        id nobis, fugit alias? Unde, debitis. Necessitatibus, est eaque. Iste.
      </div>
      <div className={styles.gallery} ref={galleryRef}>
        <header>
          <h2>Gallery</h2>
        </header>
        <main>
          <div className={card.main}>
            <Carousel>
              <img src={schoolImg1} />
              <img src={schoolImg2} />
              <img src={schoolImg3} />
              <img src={schoolImg4} />
              <img src={schoolImg5} />
            </Carousel>
          </div>
        </main>
      </div>
      <div className={styles.history} ref={historyRef}>
        <header>
          <h2>History</h2>
        </header>
        <div className={styles.container}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
          ipsum sed a sint adipisci voluptas neque accusantium, omnis temporibus
          consequatur quia, saepe totam cumque blanditiis beatae amet quisquam,
          eveniet aliquid. Lorem, ipsum dolor sit amet consectetur adipisicing
          elit. Iusto tempore eveniet inventore voluptate beatae eaque soluta,
          praesentium similique veniam illum iste perferendis quasi libero
          dolores fugiat architecto repellendus quod et. Lorem, ipsum dolor sit
          amet consectetur adipisicing elit. Iusto tempore eveniet inventore
          voluptate beatae eaque soluta, praesentium similique veniam illum iste
          perferendis quasi libero dolores fugiat architecto repellendus quod
          et. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto
          tempore eveniet inventore voluptate beatae eaque soluta, praesentium
          similique veniam illum iste perferendis quasi libero dolores fugiat
          architecto repellendus quod et.
        </div>
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
}
