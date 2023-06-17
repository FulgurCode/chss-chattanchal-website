import schoolImg from "../assets/images/login/school.png";
import svgImgDesktop from "../assets/images/login/footerDesktop.svg";
import svgImgMobile from "../assets/images/login/footerMobile.svg";
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
  const [loading, setLoading] = React.useState(false)
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
    setLoading(true)
    
    if (userType == "admin") {
      Axios.post("/admin/login", {
        username: userName,
        password: password,
      })
        .then((res) => {
          navigate("/admin");
        })
        .catch((err) => {
          if (err.response.status == 401) {
            // console.log("login unsucsessfull");
            setLoading(false)
            changeInputColor("red");
            setError(err.response.data);
          } else {
            setError(err.response.data);
          }
        });
    } else if (userType == "teacher") {
      Axios.post("/teacher/login", {
        email: userName,
        password: password,
      })
        .then((res) => {
          navigate("/teacher");
        })
        .catch((err) => {
          setLoading(false)
          setError(err.response.data);
        });
    } else {
      setLoading(false)
      setError("students or teachers login fuctionality is not added yet");
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
          <div className={styles.label}>
            <h2>Welcome to</h2>
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
