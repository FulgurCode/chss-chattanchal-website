import { useNavigate } from "react-router-dom";
import styles from "../../styles/login/Login.module.css";
import Loader from "../common/LoaderLogin";

export default function LoginElement(props) {
  const navigate = useNavigate()
  return (
    <div className={styles.loginElement}>
      <div>
        <select
          placeholder="Select user type"
          id="usertype"
          onChange={props.changeEvent}
          value={props.userType}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <span></span>
      </div>
      <span>
        <input
          id="username"
          placeholder={
            props.userType == "student"
              ? "Admission Number"
              : props.userType == "admin"
              ? "Username"
              : "Email"
          }
          value={props.userName}
          onChange={props.changeEvent}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={props.password}
          onChange={props.changeEvent}
        />
        <a href="#">Forget password?</a>
        <button className={styles.loginBtn} onClick={props.handleClick}>
          {props.loader ? (
            <div className={styles.round}>
              <Loader open={true} />
            </div>
          ) : (
            <>Login</>
          )}
        </button>
        <p id="error">{props.error}</p>
        <a
        href="/signup"
          
          style={{
            alignSelf: "center",
            textAlign: "center",
            marginTop: 10,
            fontSize: 12,
            fontWeight: 800,
            transform: "translate(0, -10%)"
          }}
        >
          Don't have an account? Sign Up
        </a>
      </span>
    </div>
  );
}
