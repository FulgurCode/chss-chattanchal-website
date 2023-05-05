import { useState } from "react";
import NavBar from "../../../components/NavBar";
import styles from "../../../styles/admin/teachers/addTeachers/AddTeachers.module.css";
import Axios from "../../../../stores/Axios";
import SuccessPopup from "../../../components/admin/newAdmission/SuccessPopup";
import NotFilledPopup from "../../../components/admin/newAdmission/NotFilledPopup";

export default function AddTeachers() {
  const [details, setDetails] = useState({
    name: "",
    phoneNo: "",
    email: "",
    penNo: "",
    designation: "",
    subject: "",
    dob: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [popup, setPopup] = useState(false);
  const [notFilledError, setNotFilledError] = useState(false);

  function HandleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (event.target.name == "phoneNo" || event.target.name == "penNo") {
      setDetails({
        ...details,
        [name]: value === "" || parseInt(value) === NaN ? "" : parseInt(value),
      });
    } else {
      setDetails({
        ...details,
        [name]: value,
      });
    }
  }

  function HandleClick() {
    if (isEmpty()) {
      setNotFilledError(true);
    } else {
      setError("");
      Axios.post("/admin/add-teacher", details)
        .then((response) => {
          setPopup(!popup);
          MakeBlank();
        })
        .catch((error) => {
          setError(error.response.data);
        });
    }
  }

  function MakeBlank() {
    setDetails({
      name: "",
      phoneNo: "",
      email: "",
      penNo: "",
      designation: "",
      subject: "",
      dob: "",
      address: "",
    });
  }

  function isEmpty() {
    for (const key in details) {
      if (details[key] === "") {
        return true;
      }
    }
    return false;
  }

  return (
    <div className={styles.container}>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.header}>
          <span>
            <img src="/imgs/importStudents/download.png" />
            <h2>Add Teacher</h2>
          </span>
          <hr />
          <h1>
            Home &gt; Teachers &gt; <code>Add Teachers</code>
          </h1>
        </div>

        <main className={styles.containerInside}>
          <div className={styles.inputContainer}>
            <span>
              Name <span>*</span>
            </span>
            <input
              type="text"
              name="name"
              onChange={HandleChange}
              value={details.name}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>
              Phone No. <span>*</span>
            </span>
            <input
              type="number"
              name="phoneNo"
              onChange={HandleChange}
              value={details.phoneNo}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>
              Email <span>*</span>
            </span>
            <input
              type="text"
              name="email"
              onChange={HandleChange}
              value={details.email}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>
              PEN Number <span>*</span>
            </span>
            <input
              type="number"
              name="penNo"
              onChange={HandleChange}
              value={details.penNo}
            />
          </div>
          <hr className={styles.under} />

          <div className={styles.inputContainer}>
            <div className={styles.sub}>
              <span>
                Designation <span>*</span>
              </span>
              <input
                type="text"
                name="designation"
                onChange={HandleChange}
                value={details.designation}
              />
            </div>

            <div className={styles.sub}>
              <span>
                Subject <span>*</span>
              </span>
              <input
                type="text"
                name="subject"
                onChange={HandleChange}
                value={details.subject}
              />
            </div>
          </div>

          <hr className={styles.under} />
          <div className={styles.inputContainer}>
            <span>
              D.O.B <span>*</span>
            </span>
            <input
              type="date"
              name="dob"
              onChange={HandleChange}
              value={details.dob}
            />
          </div>
          <div className={styles.inputContainer}>
            <span>
              Address <span>*</span>
            </span>
            <input
              type="text"
              name="address"
              onChange={HandleChange}
              value={details.address}
            />
          </div>

          <button className={styles.btn} onClick={HandleClick}>
            SUBMIT
          </button>

          <code style={{ color: "red", marginTop: 50 }}>{error}</code>

          <SuccessPopup open={popup} show={setPopup} showVar={popup} />
          <NotFilledPopup
            open={notFilledError}
            show={setNotFilledError}
            showVar={notFilledError}
          />
        </main>
      </div>
    </div>
  );
}
