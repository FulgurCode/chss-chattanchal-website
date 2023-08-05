import { Axios } from "axios";
import {useAuth} from "../../../stores/CheckloginTeacher"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../components/common/Loader";
import Navbar from "../../components/Navbar/NavBar";
import StudentTable from "../../components/StudentList/StudentTable";
import Hero from "../../components/common/PageHero";

import icon from "../../assets/images/admin/studentListIcon.png"

export default function StudentListTeacher(){
    const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

    return (
        <>
            <Navbar user="teacher" />
            <Hero title="Student List" icon={icon} />
            <StudentTable user="teacher"/>
            <Loader open={loading}/>
        </>
    )
}