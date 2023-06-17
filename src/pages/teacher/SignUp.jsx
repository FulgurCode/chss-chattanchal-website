import schoolImg from "../../assets/images/login/school.png";
import svgImgDesktop from "../../assets/images/login/footerDesktop.svg";
import svgImgMobile from "../../assets/images/login/footerMobile.svg";
import styles from "../../styles/teacher/SignUp.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import SignUpElement from "./SignUpElement";
import Axios from "../../../stores/Axios";


export default function Login() {
  const [userType, setUserType] = React.useState("teacher");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false)
  const navigate = useNavigate();

  function changeEvent(event) {
    const value = event.target.value.trim()
    if (event.target == document.getElementById("usertype")) {
      setUserType(value);
    } else if (event.target == document.getElementById("username")) {
      setEmail(value);
    } else if (event.target == document.getElementById("password")) {
      setPassword(value);
    }

    changeInputColor("grey");
    setError();
  }

  function handleClick() {
    setLoading(true)
    if (userType == "teacher") {
      Axios.post("/teacher/signup", {
        email: email,
        password: password,
      })
        .then((res) => {
          navigate("/teacher/signup-otp");
        })
        .catch((err) => {
          setLoading(false)
          setError(err.response.data);
        });
    } else {
      setLoading(false)
      setError("students sign up fuctionality is not added yet");
    }
  }

  function changeInputColor(color) {
    document.getElementById("password").style.borderColor = color;
    document.getElementById("username").style.borderColor = color;
  }

  return (
    <>
      <header className={styles.header}>www.chattanchalhss.com</header>
      <div
        className={styles.main}
        style={{ backgroundImage: `url(${schoolImg})` }}
      >
        <div className={styles.container}>
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
              loader={loading}
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
