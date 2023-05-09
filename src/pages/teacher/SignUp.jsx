import schoolImg from "/imgs/school.png";
import svgImgDesktop from "/imgs/loginImages/footerDesktop.svg";
import svgImgMobile from "/imgs/loginImages/footerMobile.svg";
import styles from "../../styles/teacher/SignUp.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpElement from "./SignUpElement";
import Axios from "../../../stores/Axios";

export default function Login() {
  const [userType, setUserType] = React.useState("Teacher");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  function changeEvent(event) {
    if (event.target == document.getElementById("usertype")) {
      setUserType(event.target.value);
    } else if (event.target == document.getElementById("username")) {
      setEmail(event.target.value);
    } else if (event.target == document.getElementById("password")) {
      setPassword(event.target.value);
    }

    changeInputColor("grey");
    setError();
  }

  function handleClick() {
    if (userType == "teacher") {
      Axios.post("/teacher/signup", {
        email: email,
        password: password,
      })
        .then((res) => {
          navigate("/teacher/signup-otp");
        })
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      setError("students sign up fuctionality is not added yet");
    }
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
          {/* <div className={styles.label}>
            <h2>Welcome to</h2>
            <h1>
              CHSS CHATTANCHAL<span></span>
            </h1>
          </div> */}
          <div className={styles.login}>
            <h1>
              Sign Up <span></span>
            </h1>
            <SignUpElement
              changeEvent={changeEvent}
              email={email}
              password={password}
              handleClick={handleClick}
              error={error}
              userType={userType}
            />
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
