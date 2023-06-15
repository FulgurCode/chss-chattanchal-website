import AllColumns from "../../../components/admin/newAdmission/AllColumns";
import NavBar from "../../../components/Navbar/NavBar";
import { useAuth } from "../../../../stores/CheckloginAdmin";
import Loader from "../../../components/common/Loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../../../components/common/PageHero";
import img2 from "../../../assets/images/admission/admissionIcon.png";

export default function NewAdmission() {
  const navigate = useNavigate()
  const [loading, setisLoading] = useState(false);
  useEffect(() => {
    useAuth(setisLoading, navigate)
  }, []);

  return (
    <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <NavBar user="admin" />
      <Hero title="New Admission" icon={img2} />
      <AllColumns user="admin" />
      <Loader open={loading} />
    </div>
  );
}
