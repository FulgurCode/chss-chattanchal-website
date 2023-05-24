import { useNavigate } from "react-router-dom";
import styles from "../styles/admin/admission/Admission.module.css";
import NavBar from "../components/Navbar/NavBar";
import { React, useEffect, useState } from "react";
import {useAuth} from "../../stores/CheckloginAdmin.jsx"
import Loader from "../components/common/Loader";
import teachersIcon from "../assets/images/admin/teachersIcon.png"
import admissionIcon from "../assets/images/admission/admissionIcon.png"


export default function Admin() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false)

  useEffect(() => {
    useAuth(setisLoading, navigate)
  }, []);

  return (
    <>
      <NavBar user="admin"/>
      <div className={styles.main}>
        <div className={styles.container}>
          <span>
            Home &gt; <span>Admin</span>
          </span>
          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/admission");
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
                navigate("/admin/teachers");
              }}
            >
              <span>
                <img src={teachersIcon} width="80px" height="80px" />
              </span>
              <h1>Teachers</h1>
            </div>
          </div>
        </div>
      </div>
      <Loader open={loading}  />
    </>
  );
}
