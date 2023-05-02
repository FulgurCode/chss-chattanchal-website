import styles from "../../../styles/admin/admission/newAdmission/AllColumns.module.css";
import React, { Fragment, useState } from "react";
import img2 from "/imgs/image_2.svg";
import { all } from "axios";
import SuccessPopup from "./SuccessPopup.jsx";
import NotFilledPopup from "./NotFilledPopup";

function AllColumns() {
  const [data, setData] = useState({
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
    course: "",
    secondLanguage: "",
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
  });

  const [popup, setPopup] = useState(false);
  const [notFilledError, setNotFilledError] = useState(false);

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

      axios.post("https://localhost:5173/api/admin/new-admission", data)
      .then(response => {
        if (response.code == 200){
          setPopup(!popup);
          setData({
            admissionDate: "",
            applicationNo: "",
            name: "",
            aadhaarNo: "",
            gender: "male",
            nameOfParent: "",
            occupationOfParent: "",
            relationshipWithGuardian: "",
            religion: "",
            caste: "",
            obc: "yes",
            linguisticMinority: "",
            dob: "",
            class: "",
            course: "",
            secondLan: "",
            nameOfBoard: "",
            registerNo: "",
            passingTime: "",
            tcNumber: "",
            tcDate: "",
            tcSchool: "",
            status: "permanent",
          });
        }
      })
      .catch(
        err => {
          if (err.code == 401){
            console.log("You are not logged in")
          } else if (err.code == 500){
            console.log("internal server error")
          }
        }
      )

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
        <div className={`${styles.subContainer}, ${styles.applicationNo}`}>
          <label className={`${styles.applicationNoLabel} ${styles.label}`}>
            Application number
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            type="number"
            onChange={handleChange}
            value={data.applicationNo}
            name="applicationNo"
            className={`${styles.applicationNoInput} ${styles.inputField}`}
          ></input>
        </div>
        <div className={`${styles.subContainer} ${styles.applicationNo}`}>
          <label className={`${styles.applicationNoLabel} ${styles.label}`}>
            Admission Date
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.admissionDate}
            type="date"
            name="admissionDate"
            className={`${styles.applicationNoInput} ${styles.inputField}`}
          ></input>
        </div>
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew} `}>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.studentNameLabel} ${styles.label}`}>
            Name of the student <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.name}
            name="name"
            className={`${styles.studentNameInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.adharNumLabel} ${styles.label}`}>
            Aadhaar No <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            type="number"
            onChange={handleChange}
            value={data.aadhaarNo}
            name="aadhaarNo"
            className={`${styles.adharNumInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.phoneNoLabel} ${styles.label}`}>
            Phone no. <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            type="number"
            onChange={handleChange}
            value={data.phone}
            name="phone"
            className={`${styles.phoneNoInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.genderLabel} ${styles.label}`}>
            Gender <span className={`${styles.aster}`}> * </span>
          </label>
          <select
            onChange={handleChange}
            value={data.gender}
            name="gender"
            className={`${styles.genderInput} ${styles.inputFieldNew} ${styles.selectElement}`}
          >
            <option value="male">Male</option>
            <option value="Female">Female</option>
            <option value="others">Others</option>
          </select>
        </div>
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew} `}>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.parentNameLabel} ${styles.label}`}>
            Name of the parent / guardian{" "}
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.nameOfParent}
            name="nameOfParent"
            className={`${styles.parentNameInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.parentOccupationLabel} ${styles.label}`}>
            Occupation of the parent / guardian{" "}
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.occupationOfParent}
            name="occupationOfParent"
            className={`${styles.parentOccupationInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.relationshipLabel} ${styles.label}`}>
            Relationship of the student to guardian{" "}
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.relationshipWithGuardian}
            name="relationshipWithGuardian"
            className={`${styles.relationshipInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.guardianAddressLabel} ${styles.label}`}>
            Address of guardian <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.addressOfGuardian}
            name="addressOfGuardian"
            className={`${styles.studentNameInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.religionLabel} ${styles.label}`}>
            Religion <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.religion}
            name="religion"
            className={`${styles.religionInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.casteLabel} ${styles.label}`}>
            Caste <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.caste}
            name="caste"
            className={`${styles.casteInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.OBCLabel} ${styles.label}`}>
            Does the student belong to OBC{" "}
            <span className={`${styles.aster}`}> * </span>
          </label>
          <select
            onChange={handleChange}
            value={data.obc}
            name="obc"
            className={`${styles.OBCInput} ${styles.inputFieldNew} ${styles.selectElement}`}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.categoryLabel} ${styles.label}`}>
            Category <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.category}
            name="category"
            className={`${styles.categoryInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.lanMinorityLabel} ${styles.label}`}>
            If the student belong to linguistic minority specify the language
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.linguisticMinority}
            name="linguisticMinority"
            className={`${styles.lanMinorityInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.DOBLabel} ${styles.label}`}>
            DOB <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.dob}
            type="date"
            name="dob"
            className={`${styles.DOBInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.classLabel} ${styles.label}`}>
            Class in which admitted
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            type="number"
            min="8"
            max="12"
            onChange={handleChange}
            value={data.class}
            name="class"
            className={`${styles.classInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.courseLabel} ${styles.label}`}>
            Course in which admitted
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.course}
            name="course"
            className={`${styles.courseInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.secondLanLabel} ${styles.label}`}>
            Second Language <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.secondLanguage}
            name="secondLanguage"
            className={`${styles.secondLanInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.status} ${styles.label}`}>
            Status <span className={`${styles.aster}`}> * </span>
          </label>
          <select
            onChange={handleChange}
            value={data.status}
            name="status"
            className={`${styles.statusLabel} ${styles.inputFieldNew} ${styles.selectElement}`}
          >
            <option value="permanent">permanent</option>
            <option value="temporary">temporary</option>
          </select>
        </div>
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <label className={`${styles.subHeadingLabel}`}>
          Details of qualifying examination
        </label>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.boardNameLabel} ${styles.label}`}>
            Name of Board <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.qualifyingExamDetails.nameOfBoard}
            name="nameOfBoard"
            className={`${styles.boardNameInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.regNoLabel} ${styles.label}`}>
            Register No. <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            type="number"
            onChange={handleChange}
            value={data.qualifyingExamDetails.registerNo}
            name="registerNo"
            className={`${styles.regNoInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label
            className={`${styles.monthAndYearOfPassingLabel} ${styles.label}`}
          >
            Month and year of passing
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.qualifyingExamDetails.passingTime}
            name="passingTime"
            className={`${styles.monthAndYearOfPassingInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
      </div>
      <hr className={`${styles.separationLine}`} />
      <div className={`${styles.containerNew}`}>
        <label className={`${styles.subHeadingLabel}`}>
          Details of Transfer certificate produced on admission
        </label>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.TCNumberLabel} ${styles.label}`}>
            Number<span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.tcDetailsOnAdmission.number}
            name="number"
            className={`${styles.TCNumberInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.TCdateLabel} ${styles.label}`}>
            Date<span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.tcDetailsOnAdmission.date}
            name="date"
            type="date"
            className={`${styles.TCdateInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
        <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.issuedSchoolLabel} ${styles.label}`}>
            Issued school / institution
            <span className={`${styles.aster}`}> * </span>
          </label>
          <input
            onChange={handleChange}
            value={data.tcDetailsOnAdmission.school}
            name="school"
            className={`${styles.issuedSchoolInput} ${styles.inputFieldNew}`}
          ></input>
        </div>
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
    </div>
  );
}

export default AllColumns;
