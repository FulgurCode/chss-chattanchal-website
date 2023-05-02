import React from "react";
import NavBar from "../../../components/NavBar";
import styles from "../../../styles/admin/admission/importStudents/Importstudents.module.css";
import Upload from "../../../components/admin/importStudents/Upload";

export default function ImportStudents() {
  return (
    <>
      <NavBar />
      <div className={styles.hero}>
        <img src="/imgs/importStudents/download.png" className={styles.downIcon} />
        <h2 className={styles.title}>Import Students</h2>
        <div className={styles.side}></div>
      </div>
      <Upload /> 
      
    </>
    
    
    )
}
