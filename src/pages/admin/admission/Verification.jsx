import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import styles from "../../../styles/admin/admission/verification/Verification.module.css";
// import studentVerificationImg from "../../../../public"
import Item from "../../../components/admin/verification/Item";
// import Table from "../../../components/admin/verification/Table.jsx";

// import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const primary = "#ccc";
const secondary = "#bbb";

export default function ImportStudents() {
  const [data, setData] = useState([
    {
      name: "John",
      class: "10",
      admissionNo: "5678",
      dob: "03-05-2003",
      _id: "2a7tF3n@epq",
    },
    {
      name: "Emily",
      class: "9",
      admissionNo: "9012",
      dob: "18-09-2004",
      _id: "9g4uK2m#jkl",
    },
    {
      name: "Michael",
      class: "12",
      admissionNo: "3456",
      dob: "27-11-2001",
      _id: "5r9pE1w@xyz",
    },
    {
      name: "Sarah",
      class: "11",
      admissionNo: "7890",
      dob: "10-02-2002",
      _id: "1b2cD3e@fgh",
    },
    {
      name: "David",
      class: "9",
      admissionNo: "2345",
      dob: "21-07-2004",
      _id: "7i8jK9l@mno",
    },
    {
      name: "Emma",
      class: "12",
      admissionNo: "6789",
      dob: "14-12-2001",
      _id: "4s5tU6v@wxy",
    },
    {
      name: "John",
      class: "10",
      admissionNo: "5678",
      dob: "03-05-2003",
      _id: "2a7tF3n@epq",
    },
    {
      name: "Emily",
      class: "9",
      admissionNo: "9012",
      dob: "18-09-2004",
      _id: "9g4uK2m#jkl",
    },
    {
      name: "Michael",
      class: "12",
      admissionNo: "3456",
      dob: "27-11-2001",
      _id: "5r9pE1w@xyz",
    },
    {
      name: "Sarah",
      class: "11",
      admissionNo: "7890",
      dob: "10-02-2002",
      _id: "1b2cD3e@fgh",
    },
    {
      name: "David",
      class: "9",
      admissionNo: "2345",
      dob: "21-07-2004",
      _id: "7i8jK9l@mno",
    },
    {
      name: "Emma",
      class: "12",
      admissionNo: "6789",
      dob: "14-12-2001",
      _id: "4s5tU6v@wxy",
    },
  ]);

  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.header}>
          <span>
            <img
              src="/imgs/AdmissionImages/item2.png"
              style={styles.newAdmissionImg}
            />
            <h1>Verification</h1>
          </span>
          <hr />
          Home &gt; Admission &gt; <code>Verification</code>
        </div>
        <div className={styles.table}>
          <Item
            data={{
              name: "Name",
              class: "Class",
              admissionNo: "Adm No.",
              dob: "DOB",
            }}
            index="Sl.No."
          />

          {data.map((item, index) => {
            return <Item data={item} index={index + 1} key={item._id} />;
          })}
        </div>
        {/* <Table details={data} /> */}
      </div>
    </>
  );
}
