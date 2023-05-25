import React from "react";
import NavBar from "../../../components/Navbar/NavBar";
import styles from "../../../styles/admin/admission/importStudents/Importstudents.module.css";
import Upload from "../../../components/admin/importStudents/Upload";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../../../components/common/Loader";
import { useAuth } from "../../../../stores/CheckloginTeacher";

import importIcon from "../../../assets/images/admission/importIcon.png";
import Hero from "../../../components/common/PageHero";

export default function ImportStudents() {
  const navigate = useNavigate();
  const [loading, setisLoading] = React.useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <>
      <NavBar user="teacher"/>
      <Hero title="Import Students" icon={importIcon} />
      <Upload user="teacher" />
      <Loader open={loading} />
    </>
  );
}
