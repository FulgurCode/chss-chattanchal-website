import AllColumns from "../../../components/admin/newAdmission/AllColumns";
import NavBar from "../../../components/NavBar";
import { useAuth } from "../../../../stores/CheckloginTeacher";
import Loader from "../../../components/common/Loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewAdmission() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);
  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  return (
    <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <NavBar />
      <AllColumns user="teacher" />
      <Loader open={loading} />
    </div>
  );
}
