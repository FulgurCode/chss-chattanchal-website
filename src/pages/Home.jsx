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
          <Link to="teacher/signup">
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
          Chattanchal Higher Secondary School was foundedfounded by TK
          Abdul Khader Haji ON 1976. It is located in Rural area. It is located in
          KASARAGOD block of KASARAGOD district of Kerala. The school consists
          of Grades from 8 to 12. The school is Co-educational and it doesn't
          have an attached pre-primary section. The school is Not Applicable in
          nature and is not using school building as a shift-school. Malayalam
          is the medium of instructions in this school. This school is
          approachable by all weather road. In this school academic session
          starts in April. The school has Private building. It has got 12
          classrooms for instructional purposes. All the classrooms are in good
          condition. It has 2 other rooms for non-teaching activities. The
          school has a separate room for Head master/Teacher. The school has
          Pucca But Broken boundary wall. The school has have electric
          connection. The source of Drinking Water in the school is Tap Water
          and it is functional. The school has 9 boys toilet and it is
          functional. and 18 girls toilet and it is functional. The school has a
          playground. The school has a library and has 3500 books in its
          library. The school does not need ramp for disabled children to access
          classrooms. The school has 50 computers for teaching and learning
          purposes and all are functional. The school is having a computer aided
          learning lab. The school is Provided and Prepared in School Premises
          providing mid-day meal.
        </div>
      </div>
      <footer className={styles.footer}></footer>
    </div>
  );
}
