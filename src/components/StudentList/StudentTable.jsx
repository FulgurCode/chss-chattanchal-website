import Axios from "../../../stores/Axios";
import { useState, useEffect } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import styles from "../../styles/admin/StudentTable/StudentListAdmin.module.css";

export default function StudentTable() {
  const [visible, setVisibile] = useState(false);
  const [data, setData] = useState([{}]);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  //   states related to seach filters
  const [searchOptions, setSearchOptions] = useState([
    "Name",
    "Admission No.",
    "Application No.",
    "Course",
  ]);
  const [selectedSearchOption, setSelectedSearchOption] = useState("");

  // const[statusOptions, setStatusOptions]= useState([
  //   "Permanent",
  //   "All",
  // ])
  // const[statusOpt, setStatus] = useState("permanent")

  const navigate = useNavigate();

  const profilePage = (item) => {
    navigate({
      pathname: "/admin/admission/verification/student-details",
      search: `?${createSearchParams({ id: item._id, editable: false })}`,
    });
  };

  function loadData() {
    setError("");
    // const status = statusOpt.toLowerCase();
    // const requestData = statusOpt == "Permanent" ? {status} : {}
    Axios.post("admin/get-students?name=", { status: "permanent" })
      .then((res) => {
        setData(res.data);
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

    if (selectedSearchOption === "Name") {
      return name.toLowerCase().includes(searchQuery.toLowerCase());
    } else if (selectedSearchOption === "Admission No.") {
      return (
        admissionNo &&
        admissionNo.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (selectedSearchOption === "Application No.") {
      return (
        item.applicationNo &&
        item.applicationNo.toString().includes(searchQuery.toLowerCase())
      );
    } else if (selectedSearchOption === "Course") {
      return (
        course &&
        course.toLowerCase().includes(searchQuery.toLowerCase())
      );

    } else {
      return searchFields.includes(searchQuery.toLowerCase());
    }
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
    loadData();
  }, []);

  //   function related to changing search values
  const handleSearchChange = (event) => {
    setSelectedSearchOption(event.target.value);
    setSearchQuery("");
  };

  // function HandleStatusChange(event){
  //   setStatus(event.target.value)
  //   loadData()
  // }

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.main}>
          <div className={styles.searchCont}>
            <input
              type="text"
              placeholder={`Search ${
                selectedSearchOption ? selectedSearchOption : "all fields"
              }`}
              value={searchQuery}
              onChange={handleSearch}
              className={styles.searchBox}
            />
            <select
              value={selectedSearchOption}
              onChange={handleSearchChange}
              className={styles.filterOption}
            >
              <option value="">Search By</option>
              {searchOptions.map((option, index) => (
                <option
                  className={styles.filterOpt}
                  key={index}
                  value={option}
                  style={{
                    fontFamily: "poppins",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {option}
                </option>
              ))}
            </select>

            {/* For filtering permenant students */}

            {/* <select
                  value={statusOpt}
                  onChange={HandleStatusChange}
                  className={styles.filterOption}
                >
                  
                  {statusOptions.map((option, index) => (
                    <option
                      className={styles.filterOpt}
                      key={index}
                      value={option}
                      style={{
                        fontFamily: "poppins",
                        fontSize: 14,
                        fontWeight: 400,
                      }}
                    >
                      {option}
                    </option>
                  ))}
                </select> */}
          </div>
          <div className={styles.table}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {/* Items Related to Search */}

                {/* -------------------------- */}
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
                <div className={styles.forScroll}>
                  <table className={styles.table}>
                    <thead>
                      <tr key={1}>
                        <th
                          onClick={() => handleSort("name")}
                          style={{ width: 20 }}
                        >
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

                        <th>Application No. </th>
                      </tr>
                    </thead>

                    <tbody className={styles.tableBody}>
                      {sortedData.length === 0 ? (
                        <tr key="no-data">
                          <td colSpan="5">No data found</td>
                        </tr>
                      ) : (
                        sortedData.map((item, index) => (
                          <tr key={index}>
                            
                            <td onClick={() => profilePage(item)}>
                              {item.name}
                            </td>
                            <td onClick={() => profilePage(item)}>
                              {item.class}
                            </td>
                            <td onClick={() => profilePage(item)}>
                              {item.admissionNo}
                            </td>
                            <td onClick={() => profilePage(item)}>
                              {item.course}
                            </td>
                            <td onClick={() => profilePage(item)}>
                              {item.applicationNo}
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
        </div>
      </div>
    </>
  );
}
