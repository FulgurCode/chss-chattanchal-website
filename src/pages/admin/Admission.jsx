import NavBar from "../../components/NavBar";
import styles from "../../styles/admin/admission/Admission.module.css";
import admission from "/imgs/adminImages/admission.png";
import { useNavigate } from "react-router-dom";

export default function Admission() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
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
                <img src={admission} width="150px" height="150px" />
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
                  src="/imgs/AdmissionImages/item2.png"
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
                  src="/imgs/AdmissionImages/item3.png"
                  width="80px"
                  height="80px"
                />
              </span>
              <h1>Import Students</h1>
            </div>

            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission/verification");
              }}
            >
              <span>
                <img
                  // src="/imgs/AdmissionImages/item3.png"
                  width="80px"
                  height="80px"
                />
              </span>
              <h1>Verfication</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
