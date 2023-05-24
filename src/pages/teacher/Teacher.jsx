import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/common/dashboard.module.css";
import NavBar from "../../components/Navbar/NavBar";
import React from "react";
import { useAuth } from "../../../stores/CheckloginTeacher";
import Loader from "../../components/common/Loader";

import admissionIcon from "../../assets/images/admission/admissionIcon.png"


export default function Teacher() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <NavBar user="teacher"/>
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
                <img src={admissionIcon} width="80px" height="80px" />
              </span>
              <h1>Admission</h1>
            </div>
            
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
