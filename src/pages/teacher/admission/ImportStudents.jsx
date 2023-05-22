import React from "react";
import NavBar from "../../../components/NavBar";
import styles from "../../../styles/admin/admission/importStudents/Importstudents.module.css";
import Upload from "../../../components/admin/importStudents/Upload";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../components/common/Loader";
import { useAuth } from "../../../../stores/CheckloginTeacher";

import importIcon from "../../../assets/images/admission/importIcon.png";

export default function ImportStudents() {
  const navigate = useNavigate();
  const [loading, setisLoading] = React.useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <NavBar />
      <div className={styles.hero}>
        <img src={importIcon} className={styles.downIcon} />
        <h2 className={styles.title}>Import Students</h2>
        <div className={styles.side}></div>
      </div>
      <Upload user="teacher" />
      <Loader open={loading} />
    </>
  );
}
