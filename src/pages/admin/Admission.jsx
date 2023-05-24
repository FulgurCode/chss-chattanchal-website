import NavBar from "../../components/Navbar/NavBar";
import styles from "../../styles/admin/admission/Admission.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../../stores/CheckloginAdmin";
import newAdmissionIcon from "../../assets/images/admission/admissionIcon.png"
import studentDetailsIcon from "../../assets/images/admission/studentDetailsIcon.png"
import importStudentsIcon from "../../assets/images/admission/importIcon.png"
import confirmationIcon from "../../assets/images/admission/confirmIcon.png"

export default function Admission() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  },[]);

  return (
    <>
      <NavBar user="admin"/>
      <div className={styles.main}>
        <div className={styles.container}>
          <span>
            Home &gt; Admin &gt; <span>Admission</span>
          </span>
          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission/new-admission");
              }}
            >
              <span>
                <img src={newAdmissionIcon} width="80px" height="80px" />
              </span>
              <h1>New Admission</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission/student-details");
              }}
            >
              <span>
                <img
                  src={studentDetailsIcon}
                  width="80px"
                  height="80px"
                />
              </span>
              <h1>Student details</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission/import-students");
              }}
            >
              <span>
                <img
                  src={importStudentsIcon}
                  width="80px"
                  height="80px"
                />
              </span>
              <h1>Import Students</h1>
            </div>

            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission/confirmation");
              }}
            >
              <span>
                <img
                  src={confirmationIcon}
                  width="80px"
                  height="80px"
                />
              </span>
              <h1>Confirmation</h1>
            </div>
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
