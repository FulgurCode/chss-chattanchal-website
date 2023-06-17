import React, { useEffect, useState } from "react";
import NavBar from "../../../components/Navbar/NavBar";
import styles from "../../../styles/teacher/verification/Verification.module.css";
import Axios from "../../../../stores/Axios";
import Popup from "../../../components/common/Popup";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useAuth } from "../../../../stores/CheckloginTeacher";
import Loader from "../../../components/common/Loader";
import verificationIcon from "../../../assets/images/admission/confirmIcon.png"
import Hero from "../../../components/common/PageHero";
import CheckDuty from "../../../components/CheckDuty";

export default function VerificationTeacher() {
  const [loading, setisLoading] = useState(false);
  const [avail, setAvail] = useState(false)
  const [visible, setVisibile] = useState(false);
  const [data, setData] = useState([{}]);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const navigate = useNavigate();

  const profilePage = (item) => {
    navigate({
      pathname: "/teacher/admission/verification/student-details",
      search: `?${createSearchParams({ id: item._id, editable: false })}`,
    });
  };

  function loadData() {
    setError("");
    Axios.get("teacher/students-to-verify")
      .then((res) => setData(res.data))
      .catch((err) => {
        if (err.response == undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
  }

  function verifyStudent(id) {
    setError("");
    Axios.patch(`teacher/verify-student?studentId=${id}`)
      .then((res) => {
        setVisibile(true);
        loadData();
      })
      .catch((err) => {
        if (err.response == undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const filteredData = data.filter((item) => {
    const { name, admissionNo, course } = item;
    const searchFields = `${name}${admissionNo}${course}`.toLowerCase();
    return searchFields.includes(searchQuery.toLowerCase());
  });
  

  const sortedData = filteredData.sort((a, b) => {
    if (sortColumn) {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];
  
      if (sortColumn === "admissionNo" || sortColumn === "class") {
        // Sort string columns
        if (columnA < columnB) {
          return sortOrder === "asc" ? -1 : 1;
        }
        if (columnA > columnB) {
          return sortOrder === "asc" ? 1 : -1;
        }
      } else if (typeof columnA === "string" && typeof columnB === "string") {
        if (isDate(columnA) && isDate(columnB)) {
          // Sort date strings
          const dateA = parseDate(columnA);
          const dateB = parseDate(columnB);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else if (!isNaN(parseFloat(columnA)) && !isNaN(parseFloat(columnB))) {
          // Sort number strings
          const numA = parseFloat(columnA);
          const numB = parseFloat(columnB);
          return sortOrder === "asc" ? numA - numB : numB - numA;
        } else {
          // Sort character strings
          if (columnA < columnB) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (columnA > columnB) {
            return sortOrder === "asc" ? 1 : -1;
          }
        }
      }
    }
    return 0;
  });
  function isDate(dateString) {
    // Check if a string represents a valid date
    const dateRegex = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
    return dateRegex.test(dateString);
  }

  function parseDate(dateString) {
    // Parse a date string in format "DD-MM-YYYY" or "DD/MM/YYYY" to a Date object
    const [day, month, year] = dateString.split(/[./-]/);
    return new Date(year, month - 1, day);
  }

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  useEffect(() => {
    setAvail(CheckDuty("verification", navigate));
    useAuth(setisLoading, navigate);
    loadData();
  }, []);

  return (
    <>
      {avail && (
        <div className={styles.mainContainer}>
          <NavBar user="teacher" />
          <Popup
            visible={visible}
            onChange={setVisibile}
            text={"Student succsessfully verified"}
          />
          <Hero title="Verification" icon={verificationIcon} />
          <div className={styles.main}>
            <div className={styles.table}>
              <div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    type="text"
                    placeholder="Search Name/Adm No/Course"
                    value={searchQuery}
                    onChange={handleSearch}
                    className={styles.searchBox}
                  />
                  <code
                    style={{
                      textAlign: "center",
                      color: "red",
                      left: 0,
                      minWidth: 0,
                    }}
                  >
                    {error}
                  </code>
                </div>

                <div className={styles.tableBox}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("name")}>
                          Name {getSortIndicator("name")}
                        </th>
                        <th onClick={() => handleSort("class")}>
                          Class {getSortIndicator("class")}
                        </th>
                        <th onClick={() => handleSort("admissionNo")}>
                          Adm No. {getSortIndicator("admissionNo")}
                        </th>
                        <th onClick={() => handleSort("course")}>
                          Course {getSortIndicator("course")}
                        </th>

                        <th></th>
                      </tr>
                    </thead>

                    <tbody className={styles.tableBody}>
                      {sortedData.length === 0 ? (
                        <tr>
                          <td colSpan="">No data found</td>
                        </tr>
                      ) : (
                        sortedData.map((item) => (
                          <tr key={item._id}>
                            <td onClick={() => profilePage(item)}>
                              {item.name}
                            </td>
                            <td onClick={() => profilePage(item)}>
                              {item.class}
                            </td>
                            <td onClick={() => profilePage(item)}>
                              {item.admissionNo}
                            </td>
                            <td onClick={() => profilePage(item)}>{item.course}</td>

                            <td>
                              <button
                                style={{ marginLeft: "30%" }}
                                className={styles.deleteBtn}
                                name=""
                                onClick={() => verifyStudent(item._id)}
                              >
                                Verify
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <Loader open={loading} />
        </div>
      )}
    </>
  );
}
