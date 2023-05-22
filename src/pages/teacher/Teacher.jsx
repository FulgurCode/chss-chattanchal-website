import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/common/dashboard.module.css";
import NavBar from "../../components/NavBar";
import React from "react";
import admission from "/imgs/adminImages/admission.png";
import attendence from "/imgs/adminImages/attendence.png";
import { useAuth } from "../../../stores/CheckloginTeacher";
import Loader from "../../components/common/Loader";

export default function Teacher() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.container}>
          <span>
            Home &gt; <span>Teacher</span>
          </span>
          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/teacher/admission");
              }}
            >
              <span>
                <img src={admission} width="150px" height="150px" />
              </span>
              <h1>Admission</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/attendence");
              }}
            >
              <span>
                <img src={attendence} width="120px" height="120px" />
              </span>
              <h1>Attendence</h1>
            </div>
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
