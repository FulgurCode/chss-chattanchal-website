import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

import menuIcon from "../../assets/images/navbar/menuButtonIcon.svg";
import bellIcon from "../../assets/images/navbar/bellIcon.svg";
import msgIcon from "../../assets/images/navbar/msgIcon.svg";
import userIcon from "../../assets/images/navbar/userIcon.svg";

import styles from "../../styles/NavBar.module.css";

export default function Navbar(props) {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const logoutRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (logoutRef.current && !logoutRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.navbar}>
      <div
        className={styles.home}
        onClick={() => navigate(`/${props.user}`)}
      >
        <img className={styles.homeImg} src={menuIcon} />
        <label className={styles.homeText}>Home</label>
      </div>

      <div className={styles.title}>
        <h4 className={styles.school}>CHATTANCHAL HSS</h4>
      </div>

      <div className={styles.icons}>
        <img className={styles.iconImg} src={msgIcon} />
        <img className={styles.iconImg} src={bellIcon} />
        <div className={styles.logoutBox} ref={logoutRef}>
          <img
            className={styles.iconImg}
            src={userIcon}
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          />
          <Logout
            show={showLogout}
            changeFunct={setShowLogout}
            user={props.user}
          />
        </div>
      </div>
    </header>
  );
}
