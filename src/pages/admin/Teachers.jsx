import { useNavigate } from "react-router-dom";
import styles from "../../styles/admin/teachers/Teachers.module.css";
import NavBar from "../../components/NavBar";
import React from "react";
import admission from "/imgs/adminImages/admission.png";
import attendence from "/imgs/adminImages/attendence.png";

export default function Admin() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.container}>
          <span>
            Home &gt; Admin &gt;<span>Teachers</span>
          </span>
          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/teachers/add-teachers");
              }}
            >
              <span>
                <img src={admission} width="150px" height="150px" />
              </span>
              <h1>Add Teacher</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/teachers/duty-allocation");
              }}
            >
              <span>
                <img src={attendence} width="120px" height="120px" />
              </span>
              <h1>Duty Allocation</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
