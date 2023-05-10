import { useSearchParams } from "react-router-dom";
import Axios from "../../../../stores/Axios";
import React from "react";
import styles from "../../../styles/admin/teachers/addTeachers/Profile.module.css";
import Navbar from "../../../components/NavBar";
import { useEffect } from "react";
import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { forwardRef } from "react";

export default function Profile() {
  let componentRef = useRef();

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
          <div className={styles.main}>
            <Details details={details} img={img} />
            <div className={styles.btnContainer}>
              {/* <button>Print</button> */}
              <ReactToPrint
                trigger={() => <button>Print</button>}
                content={() => componentRef.current}
              />
              <button>Edit</button>
            </div>
            <Table ref={componentRef} details={details} img={img} />
          </div>
        </div>
      </div>
    </>
  );
}

const Details = (props, ref) => {
  // console.log(details);
  return (
    <main className={styles.main2}>
      <div className={styles.img}>
        <img src={props.img} onerror="this.style.display='none'" alt=" " />
        {/* <object data={props.img} type="image/png">
          Alternative Text
        </object> */}
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
      {props.details.aadhaarNo == undefined ? (
        ""
      ) : (
        <div>
          <code>Aadhaar No</code>
          <code>:</code>
          <code>{props.details.aadhaarNo}</code>
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
      {props.details.admissionNo == undefined ? (
        ""
      ) : (
        <div>
          <code>Admission No</code>
          <code>:</code>
          <code>{props.details.admissionNo}</code>
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
      {props.details.caste == undefined ? (
        ""
      ) : (
        <div>
          <code>Caste</code>
          <code>:</code>
          <code>{props.details.caste}</code>
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
      {props.details.course == undefined ? (
        ""
      ) : (
        <div>
          <code>Course</code>
          <code>:</code>
          <code>{props.details.course}</code>
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
      {props.details.gender == undefined ? (
        ""
      ) : (
        <div>
          <code>Gender</code>
          <code>:</code>
          <code>{props.details.gender}</code>
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
      {props.details.obc == undefined ? (
        ""
      ) : (
        <div>
          <code>OBC</code>
          <code>:</code>
          <code>{props.details.obc}</code>
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
      {props.details.religion == undefined ? (
        ""
      ) : (
        <div>
          <code>Religion</code>
          <code>:</code>
          <code>{props.details.religion}</code>
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
            props.details of Transfer certificate produced on Admission
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
            props.details of Qualifiying Examination
          </code>
          <div>
            <code>Name of board</code>
            <code>:</code>
            <code>{props.details.qualifyingExamDetails.nameOfBoard}</code>
          </div>

          <div>
            <code>Passing time</code>
            <code>:</code>
            <code>{props.details.qualifyingExamDetails.passingTime}</code>
          </div>

          <div>
            <code>Register No</code>
            <code>:</code>
            <code>{props.details.qualifyingExamDetails.registerNo}</code>
          </div>
        </>
      )}
    </main>
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
      <div
        className={styles.img}
        style={{
          alignSelf: "center",
          margin: "10px 0",
          position: "relative",
          left: "calc(50% - 25px)",
        }}
      >
        <img src={props.img} style={{ margin: "auto" }} />
      </div>
      <tr>
        <td>Name</td>
        <td>{props.details.name}</td>
      </tr>
      <tr>
        <td>Admission Date</td>
        <td>{props.details.admissionDate}</td>
      </tr>
      <tr>
        <td>Application No.</td>
        <td>{props.details.applicationNo}</td>
      </tr>
      <tr>
        <td>Aadhaar No.</td>
        <td>{props.details.aadhaarNo}</td>
      </tr>
      <tr>
        <td>Phone</td>
        <td>{props.details.phone}</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>{props.details.gender}</td>
      </tr>
      <tr>
        <td>Name of Parent</td>
        <td>{props.details.nameOfParent}</td>
      </tr>
      <tr>
        <td>Occupation of Parent</td>
        <td>{props.details.occupationOfParent}</td>
      </tr>
      <tr>
        <td>Relationship with Guardian</td>
        <td>{props.details.relationshipWithGuardian}</td>
      </tr>
      <tr>
        <td>address of Guardian</td>
        <td>{props.details.addressOfGuardian}</td>
      </tr>
      <tr>
        <td>Religion</td>
        <td>{props.details.religion}</td>
      </tr>
      <tr>
        <td>Caste</td>
        <td>{props.details.caste}</td>
      </tr>
      <tr>
        <td>Category</td>
        <td>{props.details.category}</td>
      </tr>
      <tr>
        <td>Linguistic Minority</td>
        <td>{props.details.linguisticMinority}</td>
      </tr>
      <tr>
        <td>OBC</td>
        <td>{props.details.obc}</td>
      </tr>
      <tr>
        <td>DOB</td>
        <td>{props.details.dob}</td>
      </tr>
      <tr>
        <td>Class</td>
        <td>{props.details.class}</td>
      </tr>
      <tr>
        <td>Course</td>
        <td>{props.details.course}</td>
      </tr>
      <tr>
        <td>Second Language</td>
        <td>{props.details.secondLanguage}</td>
      </tr>
      <tr>
        <td>Status</td>
        <td>{props.details.status}</td>
      </tr>
      <tr>
        <td>Name of Board</td>
        <td>{props.details.qualifyingExamDetails.nameOfBoard}</td>
      </tr>
      <tr>
        <td>Register No.</td>
        <td>{props.details.qualifyingExamDetails.registerNo}</td>
      </tr>
      <tr>
        <td>Passsing Time</td>
        <td>{props.details.qualifyingExamDetails.passsingTime}</td>
      </tr>
      <tr>
        <td>Number</td>
        <td>{props.details.tcDetailsOnAdmission.number}</td>
      </tr>
      <tr>
        <td>Date</td>
        <td>{props.details.tcDetailsOnAdmission.date}</td>
      </tr>
      <tr>
        <td>School</td>
        <td>{props.details.tcDetailsOnAdmission.school}</td>
      </tr>
    </table>
  );
});
