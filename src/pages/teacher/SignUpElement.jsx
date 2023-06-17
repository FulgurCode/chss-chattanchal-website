import styles from "../../styles/teacher/SignUp.module.css";
import Loader from "../../components/common/LoaderLogin";

export default function LoginElement(props) {
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
          
        </select>
        <span></span>
      </div>
      <span>
        <input
          id="username"
          placeholder={
            props.userType == "student"
              ? "Admission Number"
              : props.userType == "teacher"
              ? "Email"
              : "Phone Number"
          }
          value={props.email}
          onChange={props.changeEvent}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={props.password}
          onChange={props.changeEvent}
        />
        <a href="/login">Already have an account? Login</a>
        <button onClick={props.handleClick}>{props.loader ? (
            <div className={styles.round}>
              <Loader open={true} />
            </div>
          ) : (
            <>SIGN UP</>
          )}</button>
        <p id="error">{props.error}</p>
      </span>
    </div>
  );
}
