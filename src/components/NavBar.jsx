// NavBar 3.0  -- contributions by Krishnajiyth, Hrishi, Shreyas -- 

import React from "react";
import { useNavigate } from "react-router-dom";

import styles from "../styles/NavBar.module.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className={styles.navbar}>
      <div className={styles.home} onClick={() => navigate("/admin")}>
        <img className={styles.homeImg} src="/imgs/menu_button.svg" />
        <label className={styles.homeText}>Home</label>
      </div>

      <div className={styles.title}>
        <h4 className={styles.school}>CHATTANCHAL HSS</h4>
      </div>

      <div className={styles.icons}>
        <img className={styles.iconImg} src="/imgs/msg_icon.svg" />
        <img className={styles.iconImg} src="/imgs/bell_icon.svg" />
        <img className={styles.iconImg} src="/imgs/user.png" />
      </div>
    </header>
  );
}
