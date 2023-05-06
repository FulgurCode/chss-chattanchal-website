import { useSearchParams } from "react-router-dom";
import Axios from "../../../../stores/Axios";
import React from "react";
import styles from "../../../styles/admin/teachers/addTeachers/Profile.module.css";

export default function Profile() {
  const [data] = useSearchParams();
  const id = data.getAll("id");

  const [details, setDetails] = React.useState([]);

  function getData() {
    Axios.get(`admin/get-student?studentId=${id}`)
      .then((res) => {
        setDetails([res.data]);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }

  getData();

  return (
    <div>
      {details.map((item) => {
        return <Item data={item} key={item._id} />;
      })}
    </div>
  );
}

function Item(props) {
  // console.log(props.data);
  return (
    <div className={styles.body}>
      <main className={styles.main}>
        <div>
          <code style={{ fontWeight: 600 }}>Name:</code>
          <code style={{ fontWeight: 600 }}> {props.data.name}</code>
          {/* {console.log(props.item)} */}
        </div>
        {props.data.class == undefined ? (
          ""
        ) : (
          <div>
            <code>Class:</code>
            <code> {props.data.class}</code>
          </div>
        )}
        {props.data.aadhaarNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Aadhaar No:</code>
            <code> {props.data.aadhaarNo}</code>
          </div>
        )}
        {props.data.admissionDate == undefined ? (
          ""
        ) : (
          <div>
            <code>Admission Date:</code>
            <code> {props.data.admissionDate}</code>
          </div>
        )}
        {props.data.admissionNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Admission No:</code>
            <code> {props.data.admissionNo}</code>
          </div>
        )}
        {props.data.applicationNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Application No:</code>
            <code> {props.data.applicationNo}</code>
          </div>
        )}
        {props.data.caste == undefined ? (
          ""
        ) : (
          <div>
            <code>Caste:</code>
            <code> {props.data.caste}</code>
          </div>
        )}
        {props.data.category == undefined ? (
          ""
        ) : (
          <div>
            <code>Category:</code>
            <code> {props.data.category}</code>
          </div>
        )}
        {props.data.course == undefined ? (
          ""
        ) : (
          <div>
            <code>Course:</code>
            <code> {props.data.course}</code>
          </div>
        )}
        {props.data.dob == undefined ? (
          ""
        ) : (
          <div>
            <code>Dob:</code>
            <code> {props.data.dob}</code>
          </div>
        )}
        {props.data.gender == undefined ? (
          ""
        ) : (
          <div>
            <code>Gender:</code>
            <code> {props.data.gender}</code>
          </div>
        )}
        {props.data.nameOfParent == undefined ? (
          ""
        ) : (
          <div>
            <code>Name of Parent:</code>
            <code> {props.data.nameOfParent}</code>
          </div>
        )}
        {props.data.occupationOfParent == undefined ? (
          ""
        ) : (
          <div>
            <code>Occupation of parent:</code>
            <code> {props.data.occupationOfParent}</code>
          </div>
        )}
        {props.data.phone == undefined ? (
          ""
        ) : (
          <div>
            <code>Phone:</code>
            <code> {props.data.phone}</code>
          </div>
        )}
        {props.data.linguisticMinority == undefined ? (
          ""
        ) : (
          <div>
            <code>Linguistic Minority:</code>
            <code> {props.data.linguisticMinority}</code>
          </div>
        )}
        {props.data.obc == undefined ? (
          ""
        ) : (
          <div>
            <code>OBC:</code>
            <code> {props.data.obc}</code>
          </div>
        )}
        {props.data.relationshipWithGuardian == undefined ? (
          ""
        ) : (
          <div>
            <code>Relationship with guardian:</code>
            <code> {props.data.relationshipWithGuardian}</code>
          </div>
        )}
        {props.data.religion == undefined ? (
          ""
        ) : (
          <div>
            <code>Religion:</code>
            <code> {props.data.religion}</code>
          </div>
        )}
        {props.data.secondLanguage == undefined ? (
          ""
        ) : (
          <div>
            <code>Second language:</code>
            <code> {props.data.secondLanguage}</code>
          </div>
        )}
        {props.data.status == undefined ? (
          ""
        ) : (
          <div>
            <code>Status:</code>
            <code> {props.data.status}</code>
          </div>
        )}
        {props.data.tcDetailsOnAdmission.number == undefined &&
        props.data.tcDetailsOnAdmission.date == undefined &&
        props.data.tcDetailsOnAdmission.school == undefined ? (
          ""
        ) : (
          <code className={styles.head}>
            Details of Transfer certificate produced on Admission
          </code>
        )}

        {props.data.number == undefined ? (
          ""
        ) : (
          <div>
            <code>Number:</code>
            <code> {props.data.tcDetailsOnAdmission.number}</code>
          </div>
        )}
        {props.data.tcDetailsOnAdmission.date == undefined ? (
          ""
        ) : (
          <div>
            <code>Date:</code>
            <code> {props.data.tcDetailsOnAdmission.date}</code>
          </div>
        )}
        {props.data.tcDetailsOnAdmission.school == undefined ? (
          ""
        ) : (
          <div>
            <code>School:</code>
            <code> {props.data.tcDetailsOnAdmission.school}</code>
          </div>
        )}
        {props.data.qualifyingExamDetails.nameOfBoard == undefined &&
        props.data.qualifyingExamDetails.passingTime == undefined &&
        props.data.qualifyingExamDetails.registerNo == undefined ? (
          ""
        ) : (
          <code className={styles.head}>
            Details of Qualifiying Examination
          </code>
        )}
        {props.data.qualifyingExamDetails.nameOfBoard == undefined ? (
          ""
        ) : (
          <div>
            <code>Name of board:</code>
            <code> {props.data.qualifyingExamDetails.nameOfBoard}</code>
          </div>
        )}
        {props.data.qualifyingExamDetails.passingTime == undefined ? (
          ""
        ) : (
          <div>
            <code>Passing time:</code>
            <code> {props.data.qualifyingExamDetails.passingTime}</code>
          </div>
        )}
        {props.data.qualifyingExamDetails.registerNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Register No:</code>
            <code> {props.data.qualifyingExamDetails.registerNo}</code>
          </div>
        )}
      </main>
    </div>
  );
}
