import React from "react";
import Navbar from "../../../components/Navbar/NavBar";
import styles from "../../../styles/admin/teachers/importTeachers/ImportTeachers.module.css";
import UploadTeacher from "../../../components/admin/importTeachers/UploadTeacher.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../../components/common/Loader";
import { useAuth } from "../../../../stores/CheckloginAdmin";
import importIcon from "../../../assets/images/admission/importIcon.png";

export default function ImportTeachers() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <Navbar user="admin" />
      <div className={styles.hero}>
        <img src={importIcon} className={styles.downIcon} />
        <h2 className={styles.title}>Import Teachers</h2>
        <div className={styles.side}></div>
      </div>
      <UploadTeacher />
      <Loader open={loading} />
    </>
  );
}
