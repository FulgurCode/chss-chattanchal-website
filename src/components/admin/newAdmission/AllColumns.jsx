import styles from "../../../styles/admin/admission/newAdmission/AllColumns.module.css";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Axios from "../../../../stores/Axios";
import SuccessPopup from "./SuccessPopup.jsx";
import NotFilledPopup from "./NotFilledPopup";
import Field from "./Field";
import SelectField from "./SelectField";
import QRPopUp from "./QRPopUp";
import WebCamPop from "./WebCamPopUp";
import Webcam from "react-webcam";

// ---------------- default function ----------------

function AllColumns(props) {
  // ---------------- States ----------------

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
    category: "General",
    linguisticMinority: "",
    obc: true, // this should be boolean value
    dob: "",
    class: 11, // This should be an integer
    course: "PCMB",
    secondLanguage: "Malayalam",
    status: "permanent",
    sslcNameOfBoard: "",
    sslcRegisterNo: "", // This should be an integer
    sslcPassingTime: "",
    tcNumber: "",
    tcDate: "",
    tcSchool: "",
    wgpa: "",
    rank: "",
    admissionCategory: "Merit",
  };

  const [data, setData] = useState(jsonTemp);
  const [popup, setPopup] = useState(false);
  const [notFilledError, setNotFilledError] = useState(false);
  const [filePhoto, setFilePhoto] = useState("");
  const [QR, setQR] = useState(false);
  const [webCam, setWebCam] = useState(false);
  // const photoRef = useRef('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E');
  const photoRef = useRef("");
  const [global, setGlobal] = useState(false);
  const [webCamPhoto, setWebCamPhoto] = useState("");
  const inputRef = useRef(null);
  const [filePhotoURL, setFilePhotoURL] = useState("");
  const [error, setError] = useState("");
  const [webSocket, SetWebSocket] = useState();
  const [phoneNoErr, setPhoneNoErr] = useState(false);
  const [aadhaarNoErr, setAadhaarNoErr] = useState(false);
  const [id, setId] = useState();

  async function base64ToFile(dataUrl, setState) {
    let blob = await fetch(dataUrl).then((res) => res.blob());
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const arrayBuffer = fileReader.result;
      const file = new File([arrayBuffer], "file.jpg", {
        type: blob.type,
      });
      setState(file);
    };
    fileReader.readAsArrayBuffer(blob);
  }

  // ---------------- Handle Change Function for input feild
  function handleChange(event) {
    if (event && event.target) {
      const name = event.target.name;
      const value = event.target.value;

      setData({
        ...data,
        [name]: value,
      });
    }
  }

  // ---------------- Handle Change Function for no length check

  function handleChangePhone(event) {
    setPhoneNoErr(data.phone.length !== 9);
    if (event && event.target) {
      const name = event.target.name;
      const value = event.target.value;

      setData({
        ...data,
        [name]: value,
      });
    }
  }

  function handleChangeAadhaar(event) {
    setAadhaarNoErr(data.aadhaarNo.length !== 11);
    if (event && event.target) {
      const name = event.target.name;
      const value = event.target.value;

      setData({
        ...data,
        [name]: value,
      });
    }
  }

  useEffect(() => {
    SetWebSocket(new WebSocket("wss://chattanchalhss.com/ws/admission-photo"));
    return () => {
      if (webSocket) {
        webSocket.close();
      }
    };
  }, []);

  useEffect(() => {
    if (webSocket) {
      webSocket.addEventListener("message", (event) => {
        var res = JSON.parse(event.data);
        if (res.name == "id") {
          setId(res.data);
        } else if (res.name == "image") {
          setGlobal(true);
          const dataURL = "data:image/jpeg;base64," + res.data;
          setFilePhotoURL(dataURL);
          base64ToFile(dataURL, setFilePhoto);
        }
      });
    }
  }, [webSocket]);

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
    data.applicationNo = Number(data.applicationNo);
    data.rank = Number(data.rank);
    data.wgpa = Number(data.wgpa);
    data.tcNumber = Number(data.tcNumber);
    data.phone = Number(data.phone);
    data.aadhaarNo = Number(data.aadhaarNo);
    data.obc = Boolean(data.obc);
    data.class = Number(data.class);
    data.sslcRegisterNo = Number(data.sslcRegisterNo);

    for (var prop in data) {
      if (data[prop] === "") {
        if (
          prop !== "linguisticMinority" &&
          prop !== "rank" &&
          prop !== "wgpa"
        ) {
          setNotFilledError(true);
          hasNullOrUndefinedValue = true;
          break;
        }
      }
    }

    if (!hasNullOrUndefinedValue) {
      Axios.post(`/${props.user}/new-admission`, data)
        .then((response) => {
          if (filePhoto) {
            const formData = new FormData();
            formData.append("file", filePhoto);
            Axios.post(
              `/${props.user}/upload-student-photo?studentId=${response.data}`,
              formData
            ).catch((err) => {
              if (err.response.data != undefined) {
                if (err.response.status == 413) {
                  alert("File size is too large");
                } else {
                    setError(err.response.data);
                }
              } else {
                setError("Server connection error");
              }
            });
          }
          setPopup(!popup);
          setData(jsonTemp);
          setFilePhotoURL("");
          setGlobal(true);
          inputRef.current.value = "";
        })
        .catch((err) => {
          if (err.response) {
            setError(err.response.data);
          } else {
            setError("Server connection error");
          }
        });
    }
  }

  return (
    <div className={`${styles.globalParent}`}>
      {/* ---------------- top infos ----------------   */}

      <label className={`${styles.mandatoryLabel}`}>
        Fields marked with <span className={`${styles.aster}`}> * </span> are
        mandatory
      </label>

      {/* ---------------- Container 1 ----------------  */}

      <div className={`${styles.container}`}>
        <Field
          text="Application number"
          type="number"
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

      {/* ---------------- Container 2 ----------------  */}

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
          type="number"
          change={handleChangeAadhaar}
          value={data.aadhaarNo}
          name="aadhaarNo"
          containerClass={styles.subContainerNew}
        />
        {aadhaarNoErr && (
          <p className={styles.warning}>Please enter a valid number.</p>
        )}
        <Field
          text="Phone no."
          type="number"
          change={handleChangePhone}
          value={data.phone}
          name="phone"
          containerClass={styles.subContainerNew}
        />
        {phoneNoErr && (
          <p className={styles.warning}>
            Please enter a 10-digit phone number.
          </p>
        )}
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

      {/* ---------------- Container 3 ----------------  */}

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
        <SelectField
          text="Category"
          change={handleChange}
          value={data.category}
          name="category"
          option={[
            ["General", "general"],
            ["Hindu OBC", "HinOBC"],
            ["Christ OBC", "ChristOBC"],
            ["OEC", "OEC"],
            ["Muslim", "muslim"],
            ["SC", "SC"],
            ["ST", "ST"],
          ]}
          containerClass={styles.subContainerNew}
        />
        <Field
          text="If the student belong to linguistic minority specify the language"
          change={handleChange}
          value={data.linguisticMinority}
          name="linguisticMinority"
          containerClass={styles.subContainerNew}
          notRequired={true}
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
      {/* ------------------------------------------ */}

      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <Field
          text="WGPA"
          type="number"
          min={0}
          max={10}
          change={handleChange}
          value={data.wgpa}
          name="wgpa"
          containerClass={styles.subContainerNew}
          notRequired={true}
        />
        <Field
          text="Rank"
          type="number"
          min={0}
          max={10000}
          change={handleChange}
          value={data.rank}
          name="rank"
          containerClass={styles.subContainerNew}
          notRequired={true}
        />
        <SelectField
          text="Admission category"
          change={handleChange}
          value={data.admissionCategory}
          name="admissionCategory"
          option={[
            ["Merit", "Merit"],
            ["Sports", "Sports"],
            ["IED", "IED"],
            ["Management", "Management"],
          ]}
          containerClass={styles.subContainerNew}
        />
      </div>

      {/* ---------------- Container 4 ----------------  */}

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

      {/* ---------------- Container 5 ----------------  */}

      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <label className={`${styles.subHeadingLabel}`}>
          Details of qualifying examination
        </label>
        <Field
          text="Name of Board"
          change={handleChange}
          value={data.sslcNameOfBoard}
          name="sslcNameOfBoard"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Register No."
          type="number"
          change={handleChange}
          value={data.sslcRegisterNo}
          name="sslcRegisterNo"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Month and year of passing"
          change={handleChange}
          value={data.sslcPassingTime}
          name="sslcPassingTime"
          containerClass={styles.subContainerNew}
        />
      </div>
      {/* ---------------- Container 6 ----------------  */}
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <label className={`${styles.subHeadingLabel}`}>
          Details of Transfer certificate produced on admission
        </label>
        <Field
          text="Number"
          type="number"
          change={handleChange}
          value={data.tcNumber}
          name="tcNumber"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Date"
          type="date"
          change={handleChange}
          value={data.tcDate}
          name="tcDate"
          containerClass={styles.subContainerNew}
        />
        <Field
          text="Issued school / institution"
          change={handleChange}
          value={data.tcSchool}
          name="tcSchool"
          containerClass={styles.subContainerNew}
        />
        <img
          style={{ display: global ? "block" : "none" }}
          className={styles.photoContainer}
          src={filePhotoURL}
        ></img>
        <canvas
          style={{ display: global ? "none" : "block" }}
          className={styles.photoContainer}
          ref={photoRef}
        />
        <Field
          text="Upload photo"
          type="file"
          change={onChangePhoto}
          extention="image/*"
          inputStyle={styles.uploadPhoto}
          containerClass={styles.subContainerNew}
          reference={inputRef}
        />
        <button onClick={() => setQR(true)} className={`${styles.qrButton}`}>
          Take photo on Phone
        </button>
        <button
          onClick={() => setWebCam(true)}
          className={`${styles.qrButton}`}
        >
          Take a photo on web cam
        </button>
        <label style={{ color: "red", fontSize: "15px", marginTop: "50px" }}>
          {error}
        </label>
        <button onClick={handleSubmit} className={`${styles.submitButton}`}>
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
      <QRPopUp open={QR} show={setQR} text={id} />
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
    </div>
  );
}

export default AllColumns;
