import React from "react";
import Navbar from "../../../components/NavBar";
import styles from "../../../styles/admin/teachers/importTeachers/ImportTeachers.module.css";
import UploadTeacher from "../../../components/admin/importTeachers/UploadTeacher.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import Axios from "../../../../stores/Axios";
import Loader from "../../../components/common/Loader";
import { useAuth } from "../../../../stores/CheckloginAdmin";

export default function ImportTeachers() {

  const navigate = useNavigate()
  const [loading, setisLoading] = useState(false)

  useEffect(() => {
    useAuth(setisLoading, navigate)
  },[]);

  return (
    <>
      <Navbar />
      <div className={styles.hero}>
        <img
          src="/imgs/importStudents/download.png"
          className={styles.downIcon}
        />
        <h2 className={styles.title}>Import Teachers</h2>
        <div className={styles.side}></div>
      </div>
      <UploadTeacher />
      <Loader open={loading} />
    </>
  );
}
