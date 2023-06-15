import AllColumns from "../../../components/admin/newAdmission/AllColumns";
import NavBar from "../../../components/Navbar/NavBar";
import { useAuth } from "../../../../stores/CheckloginTeacher";
import Loader from "../../../components/common/Loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckDuty from "../../../components/CheckDuty";
import Hero from "../../../components/common/PageHero";
import img2 from "../../../assets/images/admission/admissionIcon.png"

export default function NewAdmission() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);
  const [avail, setAvail] = useState(false)
  useEffect(() => {
    useAuth(setisLoading, navigate);
    setAvail(CheckDuty("add-details", navigate))
  }, []);

  return (
    <>
      {avail && (<div style={{ overflowY: "auto", maxHeight: "100vh" }}>
        <NavBar user="teacher" />
        <Hero title="New Admission" icon={img2} />
        <AllColumns user="teacher" />
        <Loader open={loading} />
      </div>)}
    </>
  );
}
