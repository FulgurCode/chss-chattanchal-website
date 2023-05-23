import style from "../../../styles/admin/admission/editStudent/EditStudent.module.css";
import React, { Fragment, useRef, useState } from "react";
import img2 from "../../../assets/images/admission/admissionIcon.png";
import Axios from "../../../../stores/Axios";
import SuccessPopup from "../../../components/admin/newAdmission/SuccessPopup";
import NotFilledPopup from "../../../components/admin/newAdmission/NotFilledPopup";
import Field from "../../../components/admin/newAdmission/Field";
import SelectField from "../../../components/admin/newAdmission/SelectField";
import NavBar from "../../../components/NavBar";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import WebCamPop from "../../../components/admin/newAdmission/WebCamPopUp";

// ---------------- default function ----------------

function editStudents() {
  // ---------------- States ----------------

  const dataTemplete = {
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

  const [data, setData] = useState(dataTemplete);
  const [popup, setPopup] = useState(false);
  const [notFilledError, setNotFilledError] = useState(false);
  const [filePhoto, setFilePhoto] = useState("");
  const [webCam, setWebCam] = useState(false);
  // const photoRef = useRef('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E');
  const photoRef = useRef("");
  const [global, setGlobal] = useState(true);
  const [webCamPhoto, setWebCamPhoto] = useState("");
  const inputRef = useRef(null);
  const [param] = useSearchParams();
  const id = param.getAll("id");
  const [filePhotoURL, setFilePhotoURL] = useState("");

  function getData() {
    Axios.get(`admin/get-student?studentId=${id}`)
      .then((response) => {
        delete response.data._id;
        setData(response.data);
      })
      .catch((err) => {
        if (err == true) {
          console.error(err);
        } else {
          console.log("server connection error");
        }
      });

    Axios.get(`admin/get-student-photo?studentId=${id}`)
      .then((response) => {
        setFilePhotoURL("data:image/jpeg;base64," + response.data);
      })

      .catch((err) => {
        if (err == true) {
          console.error(err);
        } else {
          console.log("server connection error");
        }
      });
  }

  useEffect(getData, []);

  // ---------------- Handle Change Function for input feild
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
    console.log(data);
  }

  // ---------------- onchange fn for photo upload ----------------

  function onChangePhoto(e) {
    setGlobal(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFilePhotoURL(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setFilePhoto(e.target.files[0]);
  }

  // ---------------- handle fn for final submit ----------------

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
      Axios.put(`admin/edit-student?studentId=${id}`, data)
        .then(() => {
          const formData = new FormData();
          formData.append("file", filePhoto);

          Axios.post(
            `admin/upload-student-photo?studentId=${id}`,
            formData
          ).catch((err) => {
            alert(err.response?.data);
          });

          setPopup(!popup);
          setData(dataTemplete);
          setFilePhotoURL("");
          setGlobal(true);
          history.back();
        })
        .catch((err) => {
          if (err.response == undefined) {
            console.log("server connection err OR err in .then");
          } else {
            console.log(err.response.data);
          }
        });
    }
  }

  return (
    <div className={`${style.globalParent}`}>
      <NavBar />

      {/* ---------------- top infos ----------------   */}

      <div className={`${style.subContainer}`}>
        <img className={`${style.img2}`} src={img2} />
        <label className={`${style.titleLabel}`}>Edit student</label>
        <hr className={`${style.stopLine}`} />
      </div>
      <hr className={`${style.separationLine}`} />
      <div className={`${style.pathBox}`}>
        <label className={`${style.pathLabel}`}>Home</label>
        <label className={`${style.pathLabel}`}>-</label>
        <label className={`${style.pathLabel}`}>Admissions</label>
        <label className={`${style.pathLabel}`}>-</label>
        <label className={`${style.pathLabel}`}>Edit student</label>
      </div>
      <label className={`${style.mandatoryLabel}`}>
        Fields marked with <span className={`${style.aster}`}> * </span> are
        mandatory
      </label>

      <img
        style={{ display: global ? "block" : "none", margin: "30px 0 0 16vw" }}
        className={style.photoContainer}
        src={filePhotoURL}
      ></img>
      <canvas
        style={{ display: global ? "none" : "block", margin: "30px 0 0 16vw" }}
        className={style.photoContainer}
        ref={photoRef}
      />

      {console.log(webCamPhoto)}
      <Field
        text="Upload photo"
        type="file"
        change={onChangePhoto}
        extention="image/*"
        inputStyle={style.uploadPhoto}
        containerClass={style.subContainerNew}
        styling={{ margin: "30px 0 0 16vw" }}
        reference={inputRef}
      />

      <button
        style={{ margin: "0 0 30px 16vw" }}
        onClick={() => setWebCam(true)}
        className={`${style.qrButton}`}
      >
        Take a photo on web cam
      </button>

      <WebCamPop
        open={webCam}
        show={setWebCam}
        photoRef={photoRef}
        setGlobal={setGlobal}
        setImage={setFilePhoto}
        image={filePhoto}
        inputRef={inputRef}
        webCamPhoto={setFilePhoto}
      />

      {/* ---------------- Container 1 ----------------  */}

      <div className={`${style.container}`}>
        <Field
          text="Application number"
          type="number"
          change={handleChange}
          value={data.applicationNo}
          name="applicationNo"
          containerClass={`${style.subContainer} ${style.applicationNo}`}
        />
        <Field
          text="Application Date"
          type="date"
          change={handleChange}
          value={data.admissionDate}
          name="admissionDate"
          containerClass={`${style.subContainer} ${style.applicationNo}`}
        />
      </div>
      <hr className={`${style.separationLine}`} />

      {/* ---------------- Container 2 ----------------  */}

      <div className={`${style.containerNew} `}>
        <Field
          text="Name of the student"
          change={handleChange}
          value={data.name}
          name="name"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Aadhaar no."
          type="number"
          change={handleChange}
          value={data.aadhaarNo}
          name="aadhaarNo"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Phone no."
          type="number"
          change={handleChange}
          value={data.phone}
          name="phone"
          containerClass={style.subContainerNew}
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
          containerClass={style.subContainerNew}
        />
      </div>
      <hr className={`${style.separationLine}`} />

      {/* ---------------- Container 3 ----------------  */}

      <div className={`${style.containerNew} `}>
        <Field
          text="Name of the parent / guardian"
          change={handleChange}
          value={data.nameOfParent}
          name="nameOfParent"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Occupation of the parent / guardian"
          change={handleChange}
          value={data.occupationOfParent}
          name="occupationOfParent"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Relationship of the student to guardian"
          change={handleChange}
          value={data.relationshipWithGuardian}
          name="relationshipWithGuardian"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Address of guardian"
          change={handleChange}
          value={data.addressOfGuardian}
          name="addressOfGuardian"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Religion"
          change={handleChange}
          value={data.religion}
          name="religion"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Caste"
          change={handleChange}
          value={data.caste}
          name="caste"
          containerClass={style.subContainerNew}
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
          containerClass={style.subContainerNew}
        />
        <Field
          text="Category"
          change={handleChange}
          value={data.category}
          name="category"
          containerClass={style.subContainerNew}
        />
        <Field
          text="If the student belong to linguistic minority specify the language"
          change={handleChange}
          value={data.linguisticMinority}
          name="linguisticMinority"
          containerClass={style.subContainerNew}
        />
        <Field
          text="DOB"
          type="date"
          change={handleChange}
          value={data.dob}
          name="dob"
          containerClass={style.subContainerNew}
        />
      </div>

      {/* ---------------- Container 4 ----------------  */}

      <hr className={`${style.separationLine}`} />
      <div className={`${style.containerNew}`}>
        <Field
          text="Class in which admitted"
          type="number"
          min={8}
          max={12}
          change={handleChange}
          value={data.class}
          name="class"
          containerClass={style.subContainerNew}
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
          containerClass={style.subContainerNew}
        />
        <SelectField
          text="Second Language"
          change={handleChange}
          value={data.secondLanguage}
          name="secondLanguage"
          option={[
            ["Malayalam", "Malayalam"],
            ["Arabic", "Arabic"],
            ["Hindi", "Hindi"],
          ]}
          containerClass={style.subContainerNew}
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
          containerClass={style.subContainerNew}
        />
      </div>

      {/* ---------------- Container 5 ----------------  */}

      <hr className={`${style.separationLine}`} />
      <div className={`${style.containerNew}`}>
        <label className={`${style.subHeadingLabel}`}>
          Details of qualifying examination
        </label>
        <Field
          text="Name of Board"
          change={handleChange}
          value={data.qualifyingExamDetails.nameOfBoard}
          name="nameOfBoard"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Register No."
          type="number"
          change={handleChange}
          value={data.qualifyingExamDetails.registerNo}
          name="registerNo"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Month and year of passing"
          change={handleChange}
          value={data.qualifyingExamDetails.passingTime}
          name="passingTime"
          containerClass={style.subContainerNew}
        />
      </div>
      {/* ---------------- Container 6 ----------------  */}
      <hr className={`${style.separationLine}`} />
      <div className={`${style.containerNew}`}>
        <label className={`${style.subHeadingLabel}`}>
          Details of Transfer certificate produced on admission
        </label>
        <Field
          text="Number"
          type="number"
          change={handleChange}
          value={data.tcDetailsOnAdmission.number}
          name="number"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Date"
          type="date"
          change={handleChange}
          value={data.tcDetailsOnAdmission.date}
          name="date"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Issued school / institution"
          change={handleChange}
          value={data.tcDetailsOnAdmission.school}
          name="school"
          containerClass={style.subContainerNew}
        />

        <button onClick={handleSubmit} className={`${style.submitButton}`}>
          Submit
        </button>
      </div>

      {/* ---------------- Popups ----------------  */}

      <SuccessPopup open={popup} show={setPopup} showVar={popup} />
      <NotFilledPopup
        open={notFilledError}
        show={setNotFilledError}
        showVar={notFilledError}
      />
    </div>
  );
}

export default editStudents;
