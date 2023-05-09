import React from "react";
import Navbar from "../../../components/NavBar";
import styles from "../../../styles/admin/teachers/importTeachers/ImportTeachers.module.css";
import UploadTeacher from "../../../components/admin/importTeachers/UploadTeacher.jsx";

export default function ImportTeachers() {
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
    </>
  );
}
