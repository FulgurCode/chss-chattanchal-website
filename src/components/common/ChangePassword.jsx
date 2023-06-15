import styles from "../../styles/common/ChangePassword.module.css";
import Navbar from "../Navbar/NavBar";
import ChangePasswordImg from "../../assets/images/change-password.png";
import { useState } from "react";
import Axios from "../../../stores/Axios";

import { useNavigate } from "react-router-dom";

export default function ChangePassword({user}) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const navigate = useNavigate();


  function HandleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (name == "old-password") {
      setOldPassword(value);
    } else if (name == "new-password") {
      setNewPassword(value);
    } else if (name == "confirm-password") {
      setConfirmPassword(value);
    }
  }

  function HandleClick() {
    if (newPassword == confirmPassword) {
      Axios.put(`/${user}/change-password`, {
        "new-password": newPassword,
        "old-password": oldPassword,
      })
        .then((res) => {
          navigate(-1);
        })
        .catch((err) => {
          setError(err.response.data);
        });
    } else {
      setError("Check Confirmation password again!");
    }
  }

  return (
    <>
      <Navbar user={user} />
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.img}>
            <img
              src={ChangePasswordImg}
              style={{
                width: "50vw",
                height: "50vw",
                maxHeight: "500px",
                maxWidth: "500px",
              }}
            />
          </div>
          <div className={styles.content}>
            <h1>Change Password</h1>
            <div className={styles.inputContainer}>
              <code>Old password</code>
              <input
                type={showPass ? "input" : "password"}
                name="old-password"
                value={oldPassword}
                onChange={HandleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <code>New password</code>
              <input
                type={showPass ? "input" : "password"}
                name="new-password"
                value={newPassword}
                onChange={HandleChange}
              />
            </div>
            <div className={styles.inputContainer}>
              <code>Confirm password</code>
              <input
                type={showPass ? "input" : "password"}
                name="confirm-password"
                value={confirmPassword}
                onChange={HandleChange}
              />
            </div>
            <div style={{ width: "100%" }}>
              <input
                type="checkbox"
                id="checkbox"
                checked={showPass}
                onChange={() => {
                  setShowPass(!showPass);
                }}
              />
              <label htmlFor="checkbox">Show password</label>
            </div>
            <code
              style={{
                color: "red",
                fontWeight: 500,
                textAlign: "center",
                minWidth: "100%",
              }}
            >
              {error}
            </code>

            <div className={styles.btnContainer}>
              <button
                onClick={() => {
                  navigate(-1);
                }}
              >
                Cancel
              </button>
              <button onClick={HandleClick}>Change</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
