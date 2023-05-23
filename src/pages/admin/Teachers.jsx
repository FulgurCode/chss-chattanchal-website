import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../../styles/admin/teachers/Teachers.module.css";
import NavBar from "../../components/NavBar";
import React from "react";

import newAdmissionIcon from "../../assets/images/admission/admissionIcon.png"
import importTeachersIcon from "../../assets/images/admission/importIcon.png"
import dutyAllocationIcon from "../../assets/images/admin/teachers/dutyAllocationIcon.png"


import Loader from "../../components/common/Loader";
import { useAuth } from "../../../stores/CheckloginAdmin";

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  },[]);

  return (
    <>
      <NavBar user="admin" />
      <div className={styles.main}>
        <div className={styles.container}>
          <span>
            Home &gt; Admin &gt;<span>Teachers</span>
          </span>
          <div className={styles.items}>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/teachers/add-teachers");
              }}
            >
              <span>
                <img src={newAdmissionIcon} width="80px" height="80px" />
              </span>
              <h1>Add Teacher</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/teachers/duty-allocation");
              }}
            >
              <span>
                <img src={dutyAllocationIcon} width="80px" height="80px" />
              </span>
              <h1>Duty Allocation</h1>
            </div>
            <div
              className={styles.item}
              onClick={() => {
                navigate("/admin/teachers/import-teachers");
              }}
            >
              <span>
                <img
                  src={importTeachersIcon}
                  width="80px"
                  height="80px"
                  style={{ marginTop: 10 }}
                />
              </span>
              <h1>Import Teachers</h1>
            </div>
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
