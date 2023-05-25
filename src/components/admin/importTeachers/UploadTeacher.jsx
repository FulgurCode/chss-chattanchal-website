import React, { useState } from "react";
import styles from "../../../styles/admin/teachers/importTeachers/ImportTeachers.module.css";
import Axios from "../../../../stores/Axios";

function UploadTeacher() {
  // for error
  const [msg, setMsg] = useState("");
  const [instText, setInstText] = useState("Click to change file");

  //
  const [file, setFile] = useState(null);

  function handleFileUpload(event) {
    setFile(event.target.files[0]);
  }

  function handleFileSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    Axios.post("/admin/import-teachers", formData)
      .then((response) => {
        console.log(response.data);
        setMsg(response.data);
        changeMsgColor("Green");
        setInstText("New File");
      })
      .catch((error) => {
        changeMsgColor("red");
        if (error.response.status == 401) {
          setMsg(error.response.data);
        } else {
          setMsg(error.response.data);
        }
      });
  }

  function changeMsgColor(color) {
    const header = document.getElementById("message");
    header.style.color = color;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.uploadContainer}>
          <div className={styles.uploadBox}>
            <div className={styles.info}>
              <label htmlFor="csv">
                {file ? <p>{instText}</p> : <p>Choose file</p>}
              </label>
              {file && <p>{file.name}</p>}

              <input
                id="csv"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
              />
            </div>
            <div className={styles.msg}>
              {msg ? (
                <h5 id="message">{msg}</h5>
              ) : (
                <h5 id="message">Upload CSV File Above</h5>
              )}
            </div>
            <button type="submit" onClick={handleFileSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className={styles.under}> </div>
        <div className={styles.note}>
          <p>
            <b>Note:</b>
            <br />
            It is mandatory to upload student details only in CSV file format.
            No other formats are acceptable.
          </p>
        </div>
      </div>
    </>
  );
}

export default UploadTeacher;
