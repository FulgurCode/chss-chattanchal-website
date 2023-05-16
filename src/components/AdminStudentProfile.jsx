import { useSearchParams } from "react-router-dom";
import Axios from "../../stores/Axios";
import React from "react";
import styles from "../styles/common/Profile.module.css";
import Navbar from "./NavBar";
import { useEffect } from "react";
import { useRef } from "react";

export default function Profile() {
  let componentRef = useRef();

  const [data] = useSearchParams();
  const id = data.getAll("id");

  const [details, setDetails] = React.useState({});
  const [img, setImg] = React.useState(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
  );

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
          <div className={styles.main}>
            <Details details={details} img={img} />
          </div>
        </div>
      </div>
    </>
  );
}

const Details = (props, ref) => {
  // console.log(details);
  return (
    <>
      <title>{props.details.name}</title>
      <main className={styles.main2}>
        <div className={styles.img}>
          <img
            src={props.img}
            onError={(currentTarget) => {
              currentTarget.onerror = null;
              currentTarget.src =
                "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
            }}
            alt=" "
          />
        </div>
        <div>
          <code style={{ fontWeight: 600, fontFamily: "Arial" }}>Name</code>
          <code>:</code>
          <code style={{ fontWeight: 600, fontFamily: "Arial" }}>
            {props.details.name}
          </code>
          {/* {console.log(item)} */}
        </div>
        {props.details.class == undefined ? (
          ""
        ) : (
          <div>
            <code>Class</code>
            <code>:</code>
            <code>{props.details.class}</code>
          </div>
        )}
        {props.details.gender == undefined ? (
          ""
        ) : (
          <div>
            <code>Gender</code>
            <code>:</code>
            <code>{props.details.gender}</code>
          </div>
        )}
        {props.details.dob == undefined ? (
          ""
        ) : (
          <div>
            <code>Dob</code>
            <code>:</code>
            <code>{props.details.dob}</code>
          </div>
        )}
        {props.details.aadhaarNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Aadhaar No</code>
            <code>:</code>
            <code>{props.details.aadhaarNo}</code>
          </div>
        )}
        {props.details.course == undefined ? (
          ""
        ) : (
          <div>
            <code>Course</code>
            <code>:</code>
            <code>{props.details.course}</code>
          </div>
        )}

        {props.details.applicationNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Application No</code>
            <code>:</code>
            <code>{props.details.applicationNo}</code>
          </div>
        )}
        {props.details.admissionNo == undefined ? (
          ""
        ) : (
          <div>
            <code>Admission No</code>
            <code>:</code>
            <code>{props.details.admissionNo}</code>
          </div>
        )}
        {props.details.admissionDate == undefined ? (
          ""
        ) : (
          <div>
            <code>Admission Date</code>
            <code>:</code>
            <code>{props.details.admissionDate}</code>
          </div>
        )}

        {props.details.religion == undefined ? (
          ""
        ) : (
          <div>
            <code>Religion</code>
            <code>:</code>
            <code>{props.details.religion}</code>
          </div>
        )}

        {props.details.caste == undefined ? (
          ""
        ) : (
          <div>
            <code>Caste</code>
            <code>:</code>
            <code>{props.details.caste}</code>
          </div>
        )}

        {props.details.obc == undefined ? (
          ""
        ) : (
          <div>
            <code>OBC</code>
            <code>:</code>
            <code>{props.details.obc}</code>
          </div>
        )}
        {props.details.category == undefined ? (
          ""
        ) : (
          <div>
            <code>Category</code>
            <code>:</code>
            <code>{props.details.category}</code>
          </div>
        )}

        {props.details.nameOfParent == undefined ? (
          ""
        ) : (
          <div>
            <code>Name of Parent</code>
            <code>:</code>
            <code>{props.details.nameOfParent}</code>
          </div>
        )}
        {props.details.relationshipWithGuardian == undefined ? (
          ""
        ) : (
          <div>
            <code>Relationship with guardian</code>
            <code>:</code>
            <code>{props.details.relationshipWithGuardian}</code>
          </div>
        )}
        {props.details.occupationOfParent == undefined ? (
          ""
        ) : (
          <div>
            <code>Occupation of parent</code>
            <code>:</code>
            <code>{props.details.occupationOfParent}</code>
          </div>
        )}

        {props.details.phone == undefined ? (
          ""
        ) : (
          <div>
            <code>Phone</code>
            <code>:</code>
            <code>{props.details.phone}</code>
          </div>
        )}

        {props.details.linguisticMinority == undefined ? (
          ""
        ) : (
          <div>
            <code>Linguistic Minority</code>
            <code>:</code>
            <code>{props.details.linguisticMinority}</code>
          </div>
        )}

        {props.details.secondLanguage == undefined ? (
          ""
        ) : (
          <div>
            <code>Second language</code>
            <code>:</code>
            <code>{props.details.secondLanguage}</code>
          </div>
        )}
        {props.details.status == undefined ? (
          ""
        ) : (
          <div>
            <code>Status</code>
            <code>:</code>
            <code>{props.details.status}</code>
          </div>
        )}
        <br />

        {props.details.tcDetailsOnAdmission == undefined ? ( // ith set ayi
          ""
        ) : (
          <>
            <code className={styles.head}>
              Details of Transfer certificate produced on Admission
            </code>
            <div>
              <code>Number</code>
              <code>:</code>
              <code>{props.details.tcDetailsOnAdmission.number}</code>
            </div>
            <div>
              <code>Date</code>
              <code>:</code>
              <code>{props.details.tcDetailsOnAdmission.date}</code>
            </div>
            <div>
              <code>School</code>
              <code>:</code>
              <code>{props.details.tcDetailsOnAdmission.school}</code>
            </div>
          </>
        )}
        {props.details.qualifyingExamDetails == undefined ? ( // ith set ayi
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
              <code>{props.details.qualifyingExamDetails.nameOfBoard}</code>
            </div>
            <div>
              <code>Register No</code>
              <code>:</code>
              <code>{props.details.qualifyingExamDetails.registerNo}</code>
            </div>
            <div>
              <code>Passing time</code>
              <code>:</code>
              <code>{props.details.qualifyingExamDetails.passingTime}</code>
            </div>
          </>
        )}
      </main>
    </>
  );
};
