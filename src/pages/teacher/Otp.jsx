import schoolImg from "/imgs/school.png";
import svgImgDesktop from "/imgs/loginImages/footerDesktop.svg";
import svgImgMobile from "/imgs/loginImages/footerMobile.svg";
import styles from "../../styles/teacher/Otp.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import OtpElement from "./OtpElement";
import Axios from "../../../stores/Axios";

export default function Login() {
  const [otp, setOtp] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  function changeEvent(event) {
    if (event.target == document.getElementById("usertype")) {
      setUserType(event.target.value);
    } else if (event.target == document.getElementById("username")) {
      setUserName(event.target.value);
    } else if (event.target == document.getElementById("password")) {
      setPassword(event.target.value);
    }

    changeInputColor("grey");
    setError();
  }

  function handleClick() {
    Axios.get(`teacher/signup-otp?otp=${otp}`)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        if (!err.response) {
          setError("Server is not connected");
        } else {
          setError(err.response.data);
        }
      });
  }

  function changeInputColor(color) {
    document.getElementById("password").style.borderColor = color;
    document.getElementById("username").style.borderColor = color;
  }

  return (
    <>
      <header className={styles.header}>www.chsschattanchal.com</header>
      <div
        className={styles.main}
        style={{ backgroundImage: `url(${schoolImg})` }}
      >
        <div className={styles.container}>
          <div className={styles.login}>
            <div>
              <OtpElement
                changeEvent={changeEvent}
                otp={otp}
                setOtp={setOtp}
                handleClick={handleClick}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.footer}>
        <img src={svgImgDesktop} className={styles.imgDesktop} />
        <img src={svgImgMobile} className={styles.imgMobile} />
      </footer>
    </>
  );
}
