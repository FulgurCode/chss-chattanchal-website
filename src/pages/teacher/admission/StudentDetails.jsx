import React from "react";
import { useNavigate } from "react-router-dom";
import studentDetailsImg from "../../../assets/images/admission/studentDetailsIcon.png";
import styles from "../../../styles/admin/admission/studentsDetails/StudentDetails.module.css";
import Axios from "../../../../stores/Axios";
import Item from "../../../components/admin/searchDetails/Item";
import Navbar from "../../../components/Navbar/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../stores/CheckloginTeacher";
import Loader from "../../../components/common/Loader";
import Hero from "../../../components/common/PageHero";

export default function StudentDetails() {
  const [loading, setisLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("name");
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    useAuth(setisLoading, navigate);
  }, []);

  function body(){

    let searchValue

    if (isNaN(parseInt(search))){
      searchValue = search
    } else{
      searchValue = parseInt(search)
    }

    if (value === "name"){
      return {}
    } else {
      return(
        {
          [value]: searchValue
        }
      )
    }
  }

  function handleClick() {
    console.log(
      body()
    )
    Axios.post(`teacher/get-students?name=${value === "name" ? search : ""}`, body())
      .then((res) => {
        setData(res.data);
        setError("");
      })

      .catch((err) => {
        if (err?.response?.status == 401) {
          setError("Not Logged In");
        } else if (err?.response?.status === undefined) {
          setError("Server connection error");
        } else if (err?.response?.status == 500) {
          setError(err.response.data);
        } else if (err?.response?.status == 404) {
          setError("404 Error");
        } else {
          setError(err.response.data);
        }
      });
  }

  return (
    <>
      <Navbar user="teacher"/>
      <div className={styles.main}>
      <Hero title="Student Details" icon={studentDetailsImg} />
        

        <main className={styles.container}>
          <select
            className={styles.input}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            <option value="admissionNo">Admission No.</option>
            <option value="applicationNo">Application No.</option>
            <option value="name">Name</option>
          </select>
          <input
            type="text"
            className={styles.input}
            placeholder="Search here"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={handleClick}>
              Search
            </button>
          </div>
          <div>{error}</div>

          {data.length == 0 ? (
            ""
          ) : (
            <div className={styles.list}>
              <div>
                <span>Name</span>
                <span>Adm No.</span>
                <span>Class</span>
              </div>
              {data.map((item) => {
                return <Item data={item} key={item._id} user="teacher" />;
              })}
            </div>
          )}
        </main>
      </div>
      <Loader open={loading} />
    </>
  );
}
