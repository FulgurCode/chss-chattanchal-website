import { Axios } from "axios";
import {useAuth} from "../../../stores/CheckloginAdmin"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Navbar from "../../components/Navbar/NavBar";
import StudentTable from "../../components/StudentList/StudentTable";
import Hero from "../../components/common/PageHero";

import icon from "../../assets/images/admin/studentListIcon.png"

export default function StudentListAdmin(){
    const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

    return (
        <>
            <Navbar user="admin" />
            <Hero title="Student List" icon={icon} />
            <StudentTable />
            <Loader open={loading}/>
        </>
    )
}