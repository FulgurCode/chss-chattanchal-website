import style from "../../../styles/admin/admission/editStudent/EditStudent.module.css";
import React, { Fragment, useRef, useState } from "react";
import img2 from "../../../assets/images/admission/admissionIcon.png";
import Axios from "../../../../stores/Axios";
import SuccessPopup from "../../../components/admin/newAdmission/SuccessPopup";
import NotFilledPopup from "../../../components/admin/newAdmission/NotFilledPopup";
import Field from "../../../components/admin/newAdmission/Field";
import SelectField from "../../../components/admin/newAdmission/SelectField";
import NavBar from "../../../components/Navbar/NavBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import WebCamPop from "../../../components/admin/newAdmission/WebCamPopUp";
import QRPopUp from "../../../components/admin/newAdmission/QRPopUp";
import Hero from "../../../components/common/PageHero";
import { useAuth } from "../../../../stores/CheckloginTeacher";
import CheckDuty from "../../../components/CheckDuty";
import Loader from "../../../components/common/LoaderLogin";

// ---------------- default function ----------------

function EditStudentsTeacher() {
  // ---------------- States ----------------

  const dataTemplete = {
    admissionDate: "",
    applicationNo: 0,
    name: "",
    aadhaarNo: 0,
    phone: 0, // This should be an integer
    gender: "male",
    nameOfParent: "",
    occupationOfParent: "",
    relationshipWithGuardian: "",
    addressOfGuardian: "",
    religion: "",
    caste: "",
    category: "",
    linguisticMinority: "",
    obc: false, // this should be boolean value
    dob: "",
    class: 11, // This should be an integer
    course: "PCMB",
    secondLanguage: "Malayalam",
    status: "permanent",
    sslcNameOfBoard: "",
    sslcRegisterNo: 0, // This should be an integer
    sslcPassingTime: "",
    tcNumber: "",
    tcDate: "",
    tcSchool: "",
    wgpa: "",
    rank: "",
    admissionCategory: "Merit",
    import: "",
  };

  const [data, setData] = useState(dataTemplete);
  const [popup, setPopup] = useState(false);
  const [notFilledError, setNotFilledError] = useState(false);
  const [filePhoto, setFilePhoto] = useState("");
  const [QR, setQR] = useState(false);
  const [webCam, setWebCam] = useState(false);
  // const photoRef = useRef('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"/%3E');
  const photoRef = useRef("");
  const [global, setGlobal] = useState(true);
  const [webCamPhoto, setWebCamPhoto] = useState("");
  const inputRef = useRef(null);
  const [param] = useSearchParams();
  const id = param.getAll("id");
  const [filePhotoURL, setFilePhotoURL] = useState("");
  const [webSocket, SetWebSocket] = useState();
  const [sessionId, setSessionId] = useState();
  const [phoneNoErr, setPhoneNoErr] = useState(false);
  const [aadhaarNoErr, setAadhaarNoErr] = useState(false);

  const [disable, setDisable] = useState(false);

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

  function getData() {
    Axios.get(`teacher/get-student?studentId=${id}`)
      .then((res) => {
        let response = res.data;
        delete response._id;
        response.status = "permanent";
        setData({ ...data, ...response });
      })
      .catch((err) => {});

    Axios.get(`teacher/get-student-photo?studentId=${id}`)
      .then((response) => {
        setFilePhotoURL("data:image/jpeg;base64," + response.data);
      })

      .catch((err) => {});
  }

  const navigate = useNavigate();
  const [loading, setisLoading] = useState(false);

  const [avail, setAvail] = useState(false);
  useEffect(() => {
    useAuth(setisLoading, navigate);
    setAvail(CheckDuty("add-details", navigate));
    getData();
  }, []);

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
          setSessionId(res.data);
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
    console.log("Hello")

    // For disabling the button when it is pressed
    setDisable(true)


    // type casting the variable specified
    data.applicationNo = Number(data.applicationNo);
    data.rank = Number(data.rank);
    data.wgpa = Number(data.wgpa);
    data.phone = Number(data.phone);
    data.aadhaarNo = Number(data.aadhaarNo);
    data.obc = Boolean(data.obc);
    data.class = Number(data.class);
    data.sslcRegisterNo = Number(data.sslcRegisterNo);

    Axios.put(`teacher/edit-student?studentId=${id}`, data)
      .then(() => {
        if (filePhoto) {
          const formData = new FormData();
          formData.append("file", filePhoto);

          Axios.post(
            `teacher/upload-student-photo?studentId=${id}`,
            formData
          ).then((res) => {
            setDisable(false)
          }

          ).catch((err) => {
            if (err.response.status == 413) {
              alert("File size is too large");
              setDisable(false)
            }
          });
        }

        setPopup(!popup);
        setData(dataTemplete);
        setFilePhotoURL("");
        setGlobal(true);
        history.back();
      })
      .catch((err) => {});
  }

  return (
    <div className={`${style.globalParent}`}>
      <NavBar user="teacher" />
      <Hero title="Edit Student" icon={img2} />

      {/* ---------------- top infos ----------------   */}
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

      <div className={style.photoBtn}>
        <button
          style={{ margin: "0 0 30px 16vw" }}
          className={`${style.qrButton}`}
          onClick={() => setQR(true)}
        >
          Take photo on Phone
        </button>

        <button
          style={{ margin: "0 0 30px 16vw" }}
          onClick={() => setWebCam(true)}
          className={`${style.qrButton}`}
        >
          Take a photo on web cam
        </button>
      </div>
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

      <QRPopUp open={QR} show={setQR} text={sessionId ? sessionId : ""} />

      {/* ---------------- Container 1 ----------------  */}

      <div className={`${style.container}`}>
        <Field
          text="Application number"
          type="number"
          change={!data.import ? handleChange : () => {}}
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
          change={!data.import ? handleChange : () => {}}
          value={data.name}
          name="name"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Aadhaar no."
          type="number"
          change={handleChangeAadhaar}
          value={data.aadhaarNo}
          name="aadhaarNo"
          containerClass={style.subContainerNew}
        />
        {aadhaarNoErr && (
          <p className={style.warning}>Please enter a valid number.</p>
        )}
        <Field
          text="Phone no."
          type="number"
          change={!data.import ? handleChangePhone : () => {}}
          value={data.phone}
          name="phone"
          containerClass={style.subContainerNew}
        />
        {phoneNoErr && (
          <p className={style.warning}>Please enter a 10-digit phone number.</p>
        )}
        <SelectField
          text="Gender"
          change={!data.import ? handleChange : () => {}}
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
        <SelectField
          text="Category"
          change={!data.import ? handleChange : () => {}}
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
          containerClass={style.subContainerNew}
        />
        <Field
          text="If the student belong to linguistic minority specify the language"
          change={handleChange}
          value={data.linguisticMinority}
          name="linguisticMinority"
          containerClass={style.subContainerNew}
          notRequired={true}
        />
        <Field
          text="DOB"
          type="text"
          change={!data.import ? handleChange : () => {}}
          value={data.dob}
          name="dob"
          containerClass={style.subContainerNew}
        />
      </div>

      {/* ------------------------------------------ */}

      <hr className={`${style.separationLine}`} />
      <div className={`${style.containerNew}`}>
        <Field
          text="WGPA"
          type="number"
          min={0}
          max={10}
          change={!data.import ? handleChange : () => {}}
          value={data.wgpa}
          name="wgpa"
          containerClass={style.subContainerNew}
          notRequired={true}
        />
        <Field
          text="Rank"
          type="number"
          min={0}
          max={10000}
          change={!data.import ? handleChange : () => {}}
          value={data.rank}
          name="rank"
          containerClass={style.subContainerNew}
          notRequired={true}
        />
        <SelectField
          text="Admission category"
          change={!data.import ? handleChange : () => {}}
          value={data.admissionCategory}
          name="admissionCategory"
          option={[
            ["Merit", "Merit"],
            ["Sports", "Sports"],
            ["IED", "IED"],
            ["Management", "Management"],
          ]}
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
          type="text"
          change={handleChange}
          value={data.sslcNameOfBoard}
          name="sslcNameOfBoard"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Register No."
          type="number"
          change={handleChange}
          value={data.sslcRegisterNo}
          name="sslcRegisterNo"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Month and year of passing"
          type="text"
          change={handleChange}
          value={data.sslcPassingTime}
          name="sslcPassingTime"
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
          type="text"
          change={handleChange}
          value={data.tcNumber}
          name="tcNumber"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Date"
          type="date"
          change={handleChange}
          value={data.tcDate}
          name="tcDate"
          containerClass={style.subContainerNew}
        />
        <Field
          text="Issued school / institution"
          type="text"
          change={handleChange}
          value={data.tcSchool}
          name="tcSchool"
          containerClass={style.subContainerNew}
        />

        <button onClick={handleSubmit} className={`${style.submitButton}`} disabled={disable}>
          {disable ? <Loader open={true}/> : "Submit"}
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

export default EditStudentsTeacher;
