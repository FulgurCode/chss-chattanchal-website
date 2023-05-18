import React from "react";
import Navbar from "../../../components/NavBar";
import styles from "../../../styles/admin/teachers/dutyAllocation/DutyAllocation.module.css";
import EntryPopup from "../../../components/admin/dutyAllocation/EntryPopup";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DetailsTable from "../../../components/admin/dutyAllocation/DetailsTable";
import DeletePopup from "../../../components/admin/dutyAllocation/DeletePopup";
import Axios from "../../../../stores/Axios";
import  Loader from "../../../components/common/Loader";
import { useAuth } from "../../../../stores/CheckloginAdmin";

export default function DutyAllocation() {
  const navigate = useNavigate()

  const [data, setData] = useState([]);

  const [viewOn, setViewOn] = useState(false);
  
  
  // submit data

  function handleClick(optState, setSubmitMsg, submitSuccess) {
    if (optState.teacherId !== "" && optState.duty !== "") {
      Axios.post("/admin/add-duty", optState)
        .then((response) => {
          fetchTableData();
          setSubmitMsg(response.data);
          submitSuccess();
        })
        .catch((error) => {
          console.log(error.response.data);
          setSubmitMsg(error.response.data);
        });
    }
  }

  //

  function fetchTableData() {
    Axios.get("/admin/get-duties")
      .then((response) => {
        const apiData = response.data;
        if (apiData !== null) {
          const formattedData = apiData.map((item, index) => ({
            id: index + 1,
            duty_id: item._id,
            name: item.teacher.name,
            penNumber: item.teacher.penNo,
            duty: item.duty,
          }));
          setData(formattedData);
        } else {
          setData([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  
  // useEffect(() => {
  //   Axios.get("/admin/checklogin")
  //     .then((response) => {
  //       if (response.data == false) {
  //         navigate("/login");
  //       }
  //       else {
  //         fetchTableData();
  //       }
  //     })
  //     .catch(() => {
  //       history.back();
  //     });
  // });

  const [loading, setisLoading] = useState(false)

  useEffect(() => {
    useAuth(setisLoading, navigate);
    fetchTableData();
  },[]);


  function handleButtonClick(id) {
    Axios.delete(`/admin/delete-duty?duty=${id}`)
      .then((response) => {
        fetchTableData();
        setViewOn(true);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <img src="/imgs/dutyAllocation/duty-logo.png" />
            <label>Duty Allocation</label>
          </div>
          <div className={styles.underline}></div>
          <div className={styles.pathbox}>
            <span className={styles.path}>
              Home &gt; Admin &gt; Teachers &gt;
              <span>Import Teachers</span>
            </span>
          </div>
        </div>
        <div className={styles.content}>
          {/* <div className={styles.table}> */}
          {/* <Table
              data={data}
            /> */}
          {/* </div> */}
          <div className={styles.tableWrap}>
            <DetailsTable deleteFunction={handleButtonClick} data={data} />
          </div>
          <div className={styles.buttonWrapper}>
            <EntryPopup submit={handleClick} />
            {viewOn && <DeletePopup viewFunct={setViewOn} />}
          </div>
        </div>
      </div>
      <Loader open={loading} />
    </>
  );
}
