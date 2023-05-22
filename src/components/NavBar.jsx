import React from "react";
import { useNavigate } from "react-router-dom";
import menuIcon from "../assets/images/navbar/menuButtonIcon.svg";
import bellIcon from "../assets/images/navbar/bellIcon.svg";
import msgIcon from "../assets/images/navbar/msgIcon.svg";
import userIcon from "../assets/images/navbar/userIcon.svg";

import styles from "../styles/NavBar.module.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.home} onClick={() => navigate("/admin")}>
        <img className={styles.homeImg} src={menuIcon} />
        <label className={styles.homeText}>Home</label>
      </div>

      <div className={styles.title}>
        <h4 className={styles.school}>CHATTANCHAL HSS</h4>
      </div>

      <div className={styles.icons}>
        <img className={styles.iconImg} src={msgIcon} />
        <img className={styles.iconImg} src={bellIcon} />
        <img className={styles.iconImg} src={userIcon} />
      </div>
    </header>
  );
}
