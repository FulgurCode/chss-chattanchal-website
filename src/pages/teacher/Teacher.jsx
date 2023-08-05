import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/admin/admission/Admission.module.css";
// import styles from "../../styles/admin/admission/Admission.module.css";
import NavBar from "../../components/Navbar/NavBar";
import React from "react";
import { useAuth } from "../../../stores/CheckloginTeacher";
import Loader from "../../components/common/Loader";
import Breadcrumbs from "../../components/common/BreadCrumbs";
import admissionIcon from "../../assets/images/admission/admissionIcon.png"
import studentListIcon from "../../assets/images/admin/studentListIcon.png"

export default function Teacher() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <NavBar user="teacher"/>
      <div className={styles.breadcrumb}><Breadcrumbs /></div>
      <div className={styles.main}>
        <div className={styles.container}>
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
            <div
              className={styles.item}
              onClick={() => {
                navigate("/teacher/student-list");
              }}
            >
              <span>
                <img src={studentListIcon} width="80px" height="80px" />
              </span>
              <h1>Students</h1>
            </div>
            
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
