import { useSearchParams } from "react-router-dom";
import Axios from "../../../../stores/Axios";
import React from "react";
import styles from "../../../styles/admin/teachers/addTeachers/Profile.module.css";
import Navbar from "../../../components/NavBar";
import { useEffect } from "react";

export default function Profile() {
  const [data] = useSearchParams();
  const id = data.getAll("id");

  const [details, setDetails] = React.useState({});
  const [img, setImg] = React.useState("");

  function getData() {
    Axios.get(`admin/get-student?studentId=${id}`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  useEffect(getData, []);
  function getImage() {
    Axios.get(`admin/get-student-photo?studentId=${id}`)
      .then((res) => {
        setImg("data:image/jpeg;base64," + res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }
  useEffect(getImage, []);

  return (
    <>
      <Navbar />
      <div>
        <div className={styles.body}>
          <main className={styles.main}>
            <div className={styles.img}>
              <img src={img} />
            </div>
            <div>
              <code style={{ fontWeight: 600, fontFamily: "Arial" }}>Name</code>
              <code>:</code>
              <code style={{ fontWeight: 600, fontFamily: "Arial" }}>
                {details.name}
              </code>
              {/* {console.log(item)} */}
            </div>
            {details.class == undefined ? (
              ""
            ) : (
              <div>
                <code>Class</code>
                <code>:</code>
                <code>{details.class}</code>
              </div>
            )}
            {details.aadhaarNo == undefined ? (
              ""
            ) : (
              <div>
                <code>Aadhaar No</code>
                <code>:</code>
                <code>{details.aadhaarNo}</code>
              </div>
            )}
            {details.admissionDate == undefined ? (
              ""
            ) : (
              <div>
                <code>Admission Date</code>
                <code>:</code>
                <code>{details.admissionDate}</code>
              </div>
            )}
            {details.admissionNo == undefined ? (
              ""
            ) : (
              <div>
                <code>Admission No</code>
                <code>:</code>
                <code>{details.admissionNo}</code>
              </div>
            )}
            {details.applicationNo == undefined ? (
              ""
            ) : (
              <div>
                <code>Application No</code>
                <code>:</code>
                <code>{details.applicationNo}</code>
              </div>
            )}
            {details.caste == undefined ? (
              ""
            ) : (
              <div>
                <code>Caste</code>
                <code>:</code>
                <code>{details.caste}</code>
              </div>
            )}
            {details.category == undefined ? (
              ""
            ) : (
              <div>
                <code>Category</code>
                <code>:</code>
                <code>{details.category}</code>
              </div>
            )}
            {details.course == undefined ? (
              ""
            ) : (
              <div>
                <code>Course</code>
                <code>:</code>
                <code>{details.course}</code>
              </div>
            )}
            {details.dob == undefined ? (
              ""
            ) : (
              <div>
                <code>Dob</code>
                <code>:</code>
                <code>{details.dob}</code>
              </div>
            )}
            {details.gender == undefined ? (
              ""
            ) : (
              <div>
                <code>Gender</code>
                <code>:</code>
                <code>{details.gender}</code>
              </div>
            )}
            {details.nameOfParent == undefined ? (
              ""
            ) : (
              <div>
                <code>Name of Parent</code>
                <code>:</code>
                <code>{details.nameOfParent}</code>
              </div>
            )}
            {details.occupationOfParent == undefined ? (
              ""
            ) : (
              <div>
                <code>Occupation of parent</code>
                <code>:</code>
                <code>{details.occupationOfParent}</code>
              </div>
            )}
            {details.phone == undefined ? (
              ""
            ) : (
              <div>
                <code>Phone</code>
                <code>:</code>
                <code>{details.phone}</code>
              </div>
            )}
            {details.linguisticMinority == undefined ? (
              ""
            ) : (
              <div>
                <code>Linguistic Minority</code>
                <code>:</code>
                <code>{details.linguisticMinority}</code>
              </div>
            )}
            {details.obc == undefined ? (
              ""
            ) : (
              <div>
                <code>OBC</code>
                <code>:</code>
                <code>{details.obc}</code>
              </div>
            )}
            {details.relationshipWithGuardian == undefined ? (
              ""
            ) : (
              <div>
                <code>Relationship with guardian</code>
                <code>:</code>
                <code>{details.relationshipWithGuardian}</code>
              </div>
            )}
            {details.religion == undefined ? (
              ""
            ) : (
              <div>
                <code>Religion</code>
                <code>:</code>
                <code>{details.religion}</code>
              </div>
            )}
            {details.secondLanguage == undefined ? (
              ""
            ) : (
              <div>
                <code>Second language</code>
                <code>:</code>
                <code>{details.secondLanguage}</code>
              </div>
            )}
            {details.status == undefined ? (
              ""
            ) : (
              <div>
                <code>Status</code>
                <code>:</code>
                <code>{details.status}</code>
              </div>
            )}
            <br />

            {details.tcDetailsOnAdmission == undefined ? ( // ith set ayi
              ""
            ) : (
              <>
                <code className={styles.head}>
                  Details of Transfer certificate produced on Admission
                </code>
                <div>
                  <code>Number</code>
                  <code>:</code>
                  <code>{details.tcDetailsOnAdmission.number}</code>
                </div>
                <div>
                  <code>Date</code>
                  <code>:</code>
                  <code>{details.tcDetailsOnAdmission.date}</code>
                </div>
                <div>
                  <code>School</code>
                  <code>:</code>
                  <code>{details.tcDetailsOnAdmission.school}</code>
                </div>
              </>
            )}
            {details.qualifyingExamDetails == undefined ? ( // ith set ayi
              ""
            ) : (
              <>
                <br />
                <code className={styles.head}>
                  Details of Qualifiying Examination
                </code>
                <div>
                  <code>Name of board</code>
                  <code>:</code>
                  <code>{details.qualifyingExamDetails.nameOfBoard}</code>
                </div>

                <div>
                  <code>Passing time</code>
                  <code>:</code>
                  <code>{details.qualifyingExamDetails.passingTime}</code>
                </div>

                <div>
                  <code>Register No</code>
                  <code>:</code>
                  <code>{details.qualifyingExamDetails.registerNo}</code>
                </div>
              </>
            )}

            <div className={styles.btnContainer}>
              <button>Print</button>
              <button>Edit</button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

// function Item(props) {
//   // console.log(details);
//   return (

// }
