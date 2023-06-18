import { useSearchParams } from "react-router-dom";
import Axios from "../../stores/Axios";
import React from "react";
import styles from "../styles/common/Profile.module.css";
import Navbar from "./Navbar/NavBar";
import { useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../stores/CheckloginTeacher";
import Loader from "./common/Loader";

export default function Profile() {
  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  let componentRef = useRef();
  const[avail, setAvail] = useState(false)
  const [data] = useSearchParams();
  const id = data.getAll("id");
  const editable = data.getAll("editable")[0];

  const [details, setDetails] = React.useState({});
  const [img, setImg] = React.useState(
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
  );

  useEffect(() => {
    useAuth(setisLoading, navigate);
    getData();
    getImage();
    CheckDuty()
  }, []);

  function CheckDuty(){
    Axios.get("/teacher/have-duty?duty=add-details").then((res) => {
      setAvail(res.data)
    }
    ).catch(err => console.log(err.data))
  }

  function getData() {
    Axios.get(`teacher/get-student?studentId=${id}`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
      });
  }

  function getImage() {
    Axios.get(`teacher/get-student-photo?studentId=${id}`)
      .then((res) => {
        setImg("data:image/jpeg;base64," + res.data);
      })
      .catch((err) => {
      });
  }

  function editNav(e) {
    navigate(`/teacher/admission/edit-student?id=${id}`);
  }
  return (
    <>
    <div>
      <Navbar user="teacher" />
      <div>
        <div className={styles.body}>
          <div className={styles.main}>
            <Details details={details} img={img} />
            <div className={styles.btnContainer}>
              {/* <button>Print</button> */}
              <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => componentRef.current}
                documentTitle={details.name}
              />
              {avail && <button
                onClick={editNav}
                style={{
                  display:
                    editable != undefined
                      ? editable == "true"
                        ? "flex"
                        : "none"
                      : "flex",
                }}
              >
                Edit
              </button>}
            </div>
            <Table ref={componentRef} details={details} img={img} />
          </div>
        </div>
      </div>
      <Loader open={loading} />
      </div>
    </>
  );
}

const Details = (props, ref) => {
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
            {props.details.obc ? <code>Yes</code> : <code>No</code>}
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

{props.details.rank == undefined ? (
          ""
        ) : (
          <div>
            <code>Rank</code>
            <code>:</code>
            <code>{props.details.rank}</code>
          </div>
        )}
        {props.details.wgpa == undefined ? (
          ""
        ) : (
          <div>
            <code>WGPA</code>
            <code>:</code>
            <code>{props.details.wgpa}</code>
          </div>
        )}
        {props.details.admissionCategory == undefined ? (
          ""
        ) : (
          <div>
            <code>Admission category</code>
            <code>:</code>
            <code>{props.details.admissionCategory}</code>
          </div>
        )}

{props.details.rank == undefined ? (
          ""
        ) : (
          <div>
            <code>Rank</code>
            <code>:</code>
            <code>{props.details.rank}</code>
          </div>
        )}
        {props.details.wgpa == undefined ? (
          ""
        ) : (
          <div>
            <code>WGPA</code>
            <code>:</code>
            <code>{props.details.wgpa}</code>
          </div>
        )}
        {props.details.admissionCategory == undefined ? (
          ""
        ) : (
          <div>
            <code>Admission category</code>
            <code>:</code>
            <code>{props.details.admissionCategory}</code>
          </div>
        )}

        <br />

        {props.details.tcNumber == undefined &&
        props.details.tcDate == undefined &&
        props.details.tcSchool == undefined ? ( // ith set ayi
          ""
        ) : (
          <>
            <code className={styles.head}>
              Details of Transfer certificate produced on Admission
            </code>
            <div>
              <code>Number</code>
              <code>:</code>
              <code>{props.details.tcNumber}</code>
            </div>
            <div>
              <code>Date</code>
              <code>:</code>
              <code>{props.details.tcDate}</code>
            </div>
            <div>
              <code>School</code>
              <code>:</code>
              <code>{props.details.tcSchool}</code>
            </div>
          </>
        )}
        {props.details.sslcNameOfBoard == undefined &&
        props.details.sslcRegisterNo == undefined &&
        props.details.sslcPassingTime == undefined ? ( // ith set ayi
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
              <code>{props.details.sslcNameOfBoard}</code>
            </div>
            <div>
              <code>Register No</code>
              <code>:</code>
              <code>{props.details.sslcRegisterNo}</code>
            </div>
            <div>
              <code>Passing time</code>
              <code>:</code>
              <code>{props.details.sslcPassingTime}</code>
            </div>
          </>
        )}
      </main>
    </>
  );
};

const Table = forwardRef((props, ref) => {
  return (
    <table
      ref={ref}
      border="1px"
      style={{
        borderCollapse: "collapse",
        width: 500,
        height: 100,
        margin: "auto",
        textIndend: 10,
        border: "1px solid black",
      }}
      className="print"
    >
      <tbody>
        <tr>
          <td colSpan={2}>
            <div
              className={styles.img}
              style={{
                alignSelf: "center",
                margin: "10px auto",
                position: "relative",
              }}
            >
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
          </td>
        </tr>
        <tr>
          <td>Name</td>
          <td>{props.details.name == undefined ? "" : props.details.name}</td>
        </tr>
        <tr>
          <td>Class</td>
          <td>{props.details.class == undefined ? "" : props.details.class}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>
            {props.details.gender == undefined ? "" : props.details.gender}
          </td>
        </tr>
        <tr>
          <td>DOB</td>
          <td>{props.details.dob == undefined ? "" : props.details.dob}</td>
        </tr>
        <tr>
          <td>Aadhaar No.</td>
          <td>
            {props.details.aadhaarNo == undefined
              ? ""
              : props.details.aadhaarNo}
          </td>
        </tr>

        <tr>
          <td>Application No.</td>
          <td>
            {props.details.applicationNo == undefined
              ? ""
              : props.details.applicationNo}
          </td>
        </tr>
        <tr>
          <td>Admission No</td>
          <td>
            {props.details.admissionDate == undefined
              ? ""
              : props.details.admissionNo}
          </td>
        </tr>
        <tr>
          <td>Admission Date</td>
          <td>
            {props.details.admissionDate == undefined
              ? ""
              : props.details.admissionDate}
          </td>
        </tr>

        <tr>
          <td>Religion</td>
          <td>
            {props.details.religion == undefined ? "" : props.details.religion}
          </td>
        </tr>
        <tr>
          <td>Caste</td>
          <td>{props.details.caste == undefined ? "" : props.details.caste}</td>
        </tr>
        <tr>
          <td>OBC</td>
          <td>{props.details.obc == undefined ? "" : props.details.obc ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td>
            {props.details.category == undefined ? "" : props.details.category}
          </td>
        </tr>
        <tr>
          <td>Name of Parent</td>
          <td>
            {props.details.nameOfParent == undefined
              ? ""
              : props.details.nameOfParent}
          </td>
        </tr>

        <tr>
          <td>Relationship with Guardian</td>
          <td>
            {props.details.relationshipWithGuardian == undefined
              ? ""
              : props.details.relationshipWithGuardian}
          </td>
        </tr>
        <tr>
          <td>Occupation of Parent</td>
          <td>
            {props.details.occupationOfParent == undefined
              ? ""
              : props.details.occupationOfParent}
          </td>
        </tr>
        <tr>
          <td>address of Guardian</td>
          <td>
            {props.details.addressOfGuardian == undefined
              ? ""
              : props.details.addressOfGuardian}
          </td>
        </tr>

        <tr>
          <td>Phone</td>
          <td>{props.details.phone == undefined ? "" : props.details.phone}</td>
        </tr>

        <tr>
          <td>Linguistic Minority</td>
          <td>
            {props.details.linguisticMinority == undefined
              ? ""
              : props.details.linguisticMinority}
          </td>
        </tr>

        <tr>
          <td>Second Language</td>
          <td>
            {props.details.secondLanguage == undefined
              ? ""
              : props.details.secondLanguage}
          </td>
        </tr>
        <tr>
          <td>Status</td>
          <td>
            {props.details.status == undefined ? "" : props.details.status}
          </td>
        </tr>

        <tr>
          <td>Course</td>
          <td>
            {props.details.course == undefined ? "" : props.details.course}
          </td>
        </tr>


        <tr>
          <td>Rank</td>
          <td>
            {props.details.rank == undefined ? "" : props.details.rank}
          </td>
        </tr><tr>
          <td>WGPA</td>
          <td>
            {props.details.wgpa == undefined ? "" : props.details.wgpa}
          </td>
        </tr><tr>
          <td>Admission category</td>
          <td>
            {props.details.admissionCategory == undefined ? "" : props.details.admissionCategory}
          </td>
        </tr>


        <tr>
          <td>Number</td>
          <td>
          {props.details.tcNumber == undefined
              ? ""
              : props.details.tcNumber}
          </td>
        </tr>
        <tr>
          <td>Date</td>
          <td>
          {props.details.tcDate == undefined
              ? ""
              : props.details.tcDate}
          </td>
        </tr>
        <tr>
          <td>School</td>
          <td>
          {props.details.tcSchool == undefined
              ? ""
              : props.details.tcSchool}
          </td>
        </tr>
        <tr>
          <td>Name of Board</td>
          <td>
          {props.details.sslcNameOfBoard == undefined
              ? ""
              : props.details.sslcNameOfBoard}
          </td>
        </tr>
        <tr>
          <td>Register No.</td>
          <td>
              {props.details.sslcRegisterNo == undefined
              ? ""
              : props.details.sslcRegisterNo}
          </td>
        </tr>
        <tr>
          <td>Passsing Time</td>
          <td>
              {props.details.sslcPassingTime == undefined
              ? ""
              : props.details.sslcPassingTime}
          </td>
        </tr>
      </tbody>
    </table>
  );
});
