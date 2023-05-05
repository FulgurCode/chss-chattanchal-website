import React from "react";
import studentDetailsImg from "../../../../public/imgs/AdmissionImages/item2.png";
import styles from "../../../styles/admin/admission/studentsDetails/StudentDetails.module.css";
import Axios from "../../../../stores/Axios";
import Item from "../../../components/admin/searchDetails/Item";
import Navbar from "../../../components/NavBar";

export default function StudentDetails() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("name");
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  function handleClick() {
    // console.log(value, search);
    Axios.get(`admin/get-students?search=${value}&&value=${search}`)
      .then((res) => {
        setData(res.data);
        setError("");
      })

      .catch((err) => {
        if (err?.response?.status == 401) {
          setError("Not Logged In");
        } else if (err?.response?.status === undefined) {
          setError("Server connection error");
        } else if (err?.response?.status == 500) {
          setError(err.response.data);
        } else if (err?.response?.status == 404) {
          setError("404 Error");
        } else {
          setError(err.response.data);
        }
      });
    // console.log(data);
  }

  return (
    <>
      <Navbar />
      <div className={styles.main}>
        <div className={styles.header}>
          <span>
            <img src={studentDetailsImg} style={styles.newAdmissionImg} />
            <h1>Student Details</h1>
          </span>
          <hr />
          Home &gt; Admission &gt; <code>Student Details</code>
        </div>

        <main className={styles.container}>
          <select
            className={styles.input}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          >
            <option value="admissionNo">Admission No.</option>
            <option value="applicationNo">Application No.</option>
            <option value="name">Name</option>
          </select>
          <input
            type="text"
            className={styles.input}
            placeholder="Search here"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={handleClick}>
              Search
            </button>
          </div>
          <div>{error}</div>

          {data.length == 0 ? (
            ""
          ) : (
            <div className={styles.list}>
              <div>
                <span>Name</span>
                <span>Adm No.</span>
                <span>Class</span>
              </div>
              {/* {if (data.length() == 0){console.log(empty)} } */}
              {data.map((item) => {
                return <Item data={item} key={item._id} />;
              })}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
