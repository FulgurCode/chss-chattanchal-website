import Navbar from "../../../components/Navbar/NavBar";
import Hero from "../../../components/common/PageHero";
import MainTable from "../../../components/common/report/MainTable";
import StatusTable from "../../../components/common/report/StatusTable";
import CategoryTable from "../../../components/common/report/CategoryTable";
import GenderTable from "../../../components/common/report/GenderTable";
import CasteTable from "../../../components/common/report/CasteTable";
import { useAuth } from "../../../../stores/CheckloginAdmin";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Loader from "../../../components/common/Loader";

import styles from "../../../styles/common/ReportPage.module.css";
import reportIcon from "../../../assets/images/admission/reportIcon.png";

export default function Report() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <div className={styles.main}>
        <Navbar user="admin" />
        <Hero title="Report" icon={reportIcon} />
        <div className={styles.container}>
          <div className={styles.language}>
            <StatusTable user="admin"/>
          </div>
          <div className={styles.vline}></div>
          <div className={styles.language}>
            <MainTable user="admin"/>
          </div>
          <div className={styles.vline}></div>
          <div className={styles.language}>
            <GenderTable user="admin"/>
          </div>
          <div className={styles.vline}></div>
          <div className={styles.language}>
            <CategoryTable user="admin"/>
          </div>
          <div className={styles.vline}></div>
          <div className={styles.language}>
            <CasteTable user="admin"/>
          </div>
        </div>
      </div>
      <Loader open={loading}  />
    </>
  );
}
