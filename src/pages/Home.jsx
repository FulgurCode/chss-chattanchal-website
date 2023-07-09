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
import { event } from "jquery";

export default function Home() {
  const homeRef = useRef(null);
  const galleryRef = useRef(null);
  const historyRef = useRef(null);
  const eventRef = useRef(null);
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };

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

          <Link
            onClick={() => {
              eventRef.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
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
          <Link to="/signup">
            <code>SignUp</code>
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
        Chatanchal Higher Secondary School is one of the best schools in Kerala
        with {new Date().getFullYear() - new Date("1976-01-01").getFullYear()}{" "}
        years of excellence. In every year most number of students from
        Kasaragod district complete their education from this Institution. With
        a rich legacy of academic excellence and dedicated faculties, our school
        strives to empower students with knowledge, skills and values that
        prepare them for a dynamic future. We take immense pride in providing a
        transformative learning environment that nurtures the minds of our
        students. Join us on this remarkable journey of growth and success, as
        we shape tomorrow's leaders today.
      </div>
      <div className={styles.events} ref={eventRef}>
        <main>
          <header>
            <h2>Events</h2>
          </header>
          <h4>Fresher's Day 2023</h4>
          <form>
            <div class={styles.youtubeVideoContainer}>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/sZ_AuzxhK3I"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="allowfullscreen"
                mozallowfullscreen="mozallowfullscreen"
                msallowfullscreen="msallowfullscreen"
                oallowfullscreen="oallowfullscreen"
                webkitallowfullscreen="webkitallowfullscreen"
              ></iframe>
            </div>
          </form>
        </main>
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
          Chattanchal Higher Secondary School was founded by TK Abdul Khader
          Haji ON 1976
        </div>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}
