import schoolImg from "/imgs/school.png";
import svgImgDesktop from "/imgs/loginImages/footerDesktop.svg";
import svgImgMobile from "/imgs/loginImages/footerMobile.svg";
import styles from "../styles/login/Login.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import LoginElement from "../components/login/LoginElement";
import Axios from "../../stores/Axios";

export default function Login() {
  const [userType, setUserType] = React.useState("admin");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
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
    if (userType == "admin") {
      Axios.post("/login", {
        username: userName,
        password: password,
      })
        .then((res) => {
          if (res.data == "Login Successful") {
            navigate("/admin");
          }
        })
        .catch((err) => {
          if (err.response.status == 401) {
            // console.log("login unsucsessfull");
            changeInputColor("red");
            setError(err.response.data);
          } else {
            setError(err.response.data);
          }
        });
    } else {
      setError("students or teachers login fuctionality is not added yet");
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
          <div className={styles.label}>
            <h2>Welocme to</h2>
            <h1>
              CHSS CHATTANCHAL<span></span>
            </h1>
          </div>
          <div className={styles.login}>
            <h1>
              Login <span></span>
            </h1>
            <LoginElement
              changeEvent={changeEvent}
              userName={userName}
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
