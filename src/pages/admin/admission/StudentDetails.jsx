import React from "react";
import studentDetailsImg from "../../../../public/imgs/AdmissionImages/item2.png";
import styles from "../../../styles/admin/admission/studentsDetails/StudentDetails.module.css";
import axios from "axios";
import Item from "../../../components/admin/searchDetails/Item";

export default function StudentDetails() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("name");
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  function handleClick() {
    setIsLoading(true);
    axios
      .get(
        `http://192.168.201.41:9000/api/admin/get-students?search=${value}&&value=${search}`
      )
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        setError("");
      })

      .catch((err) => {
        setIsLoading(false);

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
  }

  return (
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
          {/* <div className={styles.inputContainer}> */}
            <select className={styles.input}>
              <option value="admissionNo">Admission No.</option>
              <option value="applicationNo">Application No.</option>
              <option value="name">Name</option>
            </select>
          {/* </div> */}
          <input
            type="text"
            className={styles.input}
            placeholder="Search here"
          />
          <div className={styles.btnContainer}>
            <button className={styles.btn} onClick={handleClick}>
              Search
            </button>
          </div>
          <div>{error}</div>
        {/* <div
        style={{
          borderColor: "#ccc",
          borderWidth: 1,
          marginTop: 10,
          borderRadius: 10,
          // padding: 10,
          backgroundColor: "#FAFAFC",
          marginBottom: 50,
        }}
      >
        <div
          data={data}
          renderItem={({ item }) => <Item data={item} />}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={
            <div style={{ backgroundColor: "#ccc", height: 1 }} />
          }
          ListHeaderComponent={
            <div style={{ flexDirection: "row" }}>
              <p
                style={{
                  padding: 10,
                  paddingTop: 15,
                  flex: 2,
                  backgroundColor: "#ddd",
                  borderTopLeftRadius: 8,
                }}
              >
                Name
              </p>
              <p
                style={{
                  padding: 10,
                  paddingTop: 15,
                  flex: 1,
                  backgroundColor: "#ccc",
                  textAlign: "center",
                }}
              >
                Adm No
                Class
                </p>
            </div>
          }
          scrollEnabled={false}
        />
      </div> */}
      </main>
    </div>
  );
}
