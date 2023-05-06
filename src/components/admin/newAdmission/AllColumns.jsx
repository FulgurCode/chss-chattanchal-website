import styles from "../../../styles/admin/admission/newAdmission/AllColumns.module.css";
import React, { Fragment, useState } from "react";
import img2 from "/imgs/image_2.svg";
import Axios from "../../../../stores/Axios";
import SuccessPopup from "./SuccessPopup.jsx";
import NotFilledPopup from "./NotFilledPopup";
import Field from "./Field";
import SelectField from "./SelectField";
import QRPopUp from "./QRPopUp";

function AllColumns() {
  const jsonTemp = {
    admissionDate: "",
    applicationNo: "",
    name: "",
    aadhaarNo: "",
    phone: "", // This should be an integer
    gender: "male",
    nameOfParent: "",
    occupationOfParent: "",
    relationshipWithGuardian: "",
    addressOfGuardian: "",
    religion: "",
    caste: "",
    category: "",
    linguisticMinority: "",
    obc: true, // this should be boolean value
    dob: "",
    class: 11, // This should be an integer
    course: "PCMB",
    secondLanguage: "Malayalam",
    status: "permanent",
    qualifyingExamDetails: {
      nameOfBoard: "",
      registerNo: "", // This should be an integer
      passingTime: "",
    },
    tcDetailsOnAdmission: {
      number: "",
      date: "",
      school: "",
    },
  };
  const [data, setData] = useState(jsonTemp);
  const [popup, setPopup] = useState(false);
  const [notFilledError, setNotFilledError] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [QR, setQR] = useState(false);

  function handleChange(event) {
    if (event && event.target) {
      const name = event.target.name;
      const value = event.target.value;

      if (
        name == "nameOfBoard" ||
        name == "registerNo" ||
        name == "passingTime"
      ) {
        setData({
          ...data,
          qualifyingExamDetails: {
            ...data.qualifyingExamDetails,
            [name]: value,
          },
        });
      } else if (name == "number" || name == "date" || name == "school") {
        setData({
          ...data,
          tcDetailsOnAdmission: {
            ...data.tcDetailsOnAdmission,
            [name]: value,
          },
        });
      } else {
        setData({
          ...data,
          [name]: value,
        });
      }
    }
  }

  function onChangePhoto(e) {
    setPhoto(e.target.file[0]);
  }

  function handleQR(event){

    setQR(!false)

  } 

  function handleSubmit(event) {
    event.preventDefault();

    var hasNullOrUndefinedValue = false;

    // type casting the variable specified

    data.tcDetailsOnAdmission.number = Number(data.tcDetailsOnAdmission.number);
    data.phone = Number(data.phone);
    data.obc = Boolean(data.obc);
    data.class = Number(data.class);
    data.qualifyingExamDetails.registerNo = Number(
      data.qualifyingExamDetails.registerNo
    );

    for (var prop in data) {
      if (data[prop] === "") {
        setNotFilledError(true);
        console.log(prop + " field is not filled");
        hasNullOrUndefinedValue = true;
        break;
      }
    }

    if (hasNullOrUndefinedValue) {
      console.log("no");
      console.log(data);
    } else {
      console.log("yes");
      console.log(data);

      Axios.post("admin/new-admission", data)
        .then((response) => {
          const formData = new FormData();
          formData.append("file", photo);

          Axios.post(
            `admin/upload-student-photo?studentId=${response.data}`,
            formData
          ).catch((err) => {
            alert(err.response?.data);
          });

          setPopup(!popup);
          setData(jsonTemp);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            console.log("You are not logged in");
          } else if (err.response.status == 500) {
            console.log("internal server error");
          }
        });
    }
  }

  return (
    <div className={`${styles.globalParent}`}>
      <div className={`${styles.subContainer}`}>
        <img className={`${styles.img2}`} src={img2} />
        <label className={`${styles.titleLabel}`}>New Admissions</label>
        <hr className={`${styles.stopLine}`} />
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.pathBox}`}>
        <label className={`${styles.pathLabel}`}>Home</label>
        <label className={`${styles.pathLabel}`}>-</label>
        <label className={`${styles.pathLabel}`}>Admissions</label>
        <label className={`${styles.pathLabel}`}>-</label>
        <label className={`${styles.pathLabel}`}>New Admission</label>
      </div>
      <label className={`${styles.mandatoryLabel}`}>
        Fields marked with <span className={`${styles.aster}`}> * </span> are
        mandatory
      </label>
      <div className={`${styles.container}`}>
        <Field
          text="Application number"
          change={handleChange}
          value={data.applicationNo}
          name="applicationNo"
          containerClass={`${styles.subContainer} ${styles.applicationNo}`}
        />
        <Field
          text="Application Date"
          type="date"
          change={handleChange}
          value={data.admissionDate}
          name="admissionDate"
          containerClass={`${styles.subContainer} ${styles.applicationNo}`}
        />
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew} `}>
        <Field
          text="Name of the student"
          change={handleChange}
          value={data.name}
          name="name"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Aadhaar no."
          change={handleChange}
          value={data.aadhaarNo}
          name="aadhaarNo"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Phone no."
          change={handleChange}
          value={data.phone}
          name="phone"
          containerClass={styles.subContainerNew}
        />
        <SelectField
          text="Gender"
          change={handleChange}
          value={data.gender}
          name="gender"
          option={[
            ["Male", "male"],
            ["Female", "female"],
            ["Others", "others"],
          ]}
          containerClass={styles.subContainerNew}
        />
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew} `}>
        <Field
          text="Name of the parent / guardian"
          change={handleChange}
          value={data.nameOfParent}
          name="nameOfParent"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Occupation of the parent / guardian"
          change={handleChange}
          value={data.occupationOfParent}
          name="occupationOfParent"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Relationship of the student to guardian"
          change={handleChange}
          value={data.relationshipWithGuardian}
          name="relationshipWithGuardian"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Address of guardian"
          change={handleChange}
          value={data.addressOfGuardian}
          name="addressOfGuardian"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Religion"
          change={handleChange}
          value={data.religion}
          name="religion"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Caste"
          change={handleChange}
          value={data.caste}
          name="caste"
          containerClass={styles.subContainerNew}
        />
        <SelectField
          text=" Does the student belong to OBC"
          change={handleChange}
          value={data.obc}
          name="obc"
          option={[
            ["yes", true],
            ["no", false],
          ]}
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Category"
          change={handleChange}
          value={data.category}
          name="category"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="If the student belong to linguistic minority specify the language"
          change={handleChange}
          value={data.linguisticMinority}
          name="linguisticMinority"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="DOB"
          type="date"
          change={handleChange}
          value={data.dob}
          name="dob"
          containerClass={styles.subContainerNew}
        />
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <Field
          text="Class in which admitted"
          type="number"
          min={8}
          max={12}
          change={handleChange}
          value={data.class}
          name="class"
          containerClass={styles.subContainerNew}
        />
        <SelectField
          text="Course in which admitted"
          course
          change={handleChange}
          value={data.course}
          name="course"
          option={[
            ["PCMB - Physics, Chemistry, Maths, Biology", "PCMB"],
            ["PCMC - Physics, Chemistry, Maths, Computer Science", "PCMC"],
            [
              "COMMERCE - Bussiness, Computer applications, Economics, Accountancy",
              "COMMERCE",
            ],
          ]}
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Second Language"
          change={handleChange}
          value={data.secondLanguage}
          name="secondLanguage"
          containerClass={styles.subContainerNew}
        />
        <SelectField
          text="Status"
          change={handleChange}
          value={data.status}
          name="status"
          option={[
            ["permanent", "permanent"],
            ["temporary", "temporary"],
          ]}
          containerClass={styles.subContainerNew}
        />
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <label className={`${styles.subHeadingLabel}`}>
          Details of qualifying examination
        </label>
        <Field
          text="Name of Board"
          change={handleChange}
          value={data.qualifyingExamDetails.nameOfBoard}
          name="nameOfBoard"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Register No."
          change={handleChange}
          value={data.registerNo}
          name="registerNo"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Month and year of passing"
          change={handleChange}
          value={data.qualifyingExamDetails.passingTime}
          name="passingTime"
          containerClass={styles.subContainerNew}
        />
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <label className={`${styles.subHeadingLabel}`}>
          Details of Transfer certificate produced on admission
        </label>
        <Field
          text="Number"
          type="number"
          change={handleChange}
          value={data.tcDetailsOnAdmission.number}
          name="number"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Date"
          type="date"
          change={handleChange}
          value={data.tcDetailsOnAdmission.date}
          name="date"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Issued school / institution"
          change={handleChange}
          value={data.tcDetailsOnAdmission.school}
          name="school"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Upload photo"
          type="file"
          change={onChangePhoto}
          value={photo}
          extention=".jpg"
          containerClass={styles.subContainerNew}
        />
        <button onClick={handleQR} className={`${styles.qrButton}`}>Take photo on Phone</button>
        <button className={`${styles.qrButton}`}>Take a photo on web cam</button>
        <button onClick={handleSubmit} className={`${styles.submitButton}`}>
          Submit
        </button>
      </div>
      <SuccessPopup open={popup} show={setPopup} showVar={popup} />
      <NotFilledPopup
        open={notFilledError}
        show={setNotFilledError}
        showVar={notFilledError}
      />
      <QRPopUp
        open={QR}
        show={setQR}
        text="I am inevitable"
      />
    </div>
  );
}

export default AllColumns;
