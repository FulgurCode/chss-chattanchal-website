import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import styles from "../../../styles/admin/admission/verification/Verification.module.css";
// import Item from "../../../components/admin/verification/Item";

// const primary = "#ccc";
// const secondary = "#bbb";

export default function Verification() {
  const [data, setData] = useState([
    {
      name: "John",
      class: "10",
      admissionNo: "5678",
      dob: "03-05-2003",
      _id: "2a7tF3n@epq",
    },
    {
      name: "Emily",
      class: "9",
      admissionNo: "9012",
      dob: "18-09-2004",
      _id: "9g4uK2m#jkl",
    },
    {
      name: "Michael",
      class: "12",
      admissionNo: "3456",
      dob: "27-11-2001",
      _id: "5r9spE1w@xyz",
    },
    {
      name: "Sarah",
      class: "11",
      admissionNo: "7890",
      dob: "10-02-2002",
      _id: "1b2cD3e@fgh",
    },
    {
      name: "David",
      class: "9",
      admissionNo: "2345",
      dob: "21-07-2004",
      _id: "7i8jK9l@mno",
    },
    {
      name: "Emma",
      class: "12",
      admissionNo: "6789",
      dob: "14-12-2001",
      _id: "4s5tU6v@wxy",
    },
    {
      name: "John",
      class: "10",
      admissionNo: "5678",
      dob: "03-05-2003",
      _id: "2a7tF3ng@epq",
    },
    {
      name: "Emily",
      class: "9",
      admissionNo: "9012",
      dob: "18-09-2004",
      _id: "9g4uKe2m#jkl",
    },
    {
      name: "Michael",
      class: "12",
      admissionNo: "3456",
      dob: "27-11-2001",
      _id: "5r9pEw1whtrh@xyz",
    },
    {
      name: "Sarah",
      class: "11",
      admissionNo: "7890",
      dob: "10-02-2002",
      _id: "1b2cDc3eer@fgh",
    },
    {
      name: "David",
      class: "9",
      admissionNo: "2345",
      dob: "21-07-2004",
      _id: "7i8jK9dgla@mno",
    },
    {
      name: "Emma",
      class: "12",
      admissionNo: "6789",
      dob: "14-12-2001",
      _id: "4s5tU6zasdv@wxy",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc"); 

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
    const { name, admissionNo } = item;
    const searchFields = `${name}${admissionNo}`.toLowerCase();
    return searchFields.includes(searchQuery.toLowerCase());
  });
  
  const sortedData = filteredData.sort((a, b) => {
    if (sortColumn) {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];
  
      if (typeof columnA === "string" && typeof columnB === "string") {
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

  return (
    <>
      <NavBar />
      <div className={styles.main}>
        <div className={styles.header}>
          <span>
            <img
              src="/imgs/AdmissionImages/item2.png"
              style={styles.newAdmissionImg}
            />
            <h1>Verification</h1>
          </span>
          <hr />
          Home &gt; Admission &gt; <code>Verification</code>
        </div>
        <div className={styles.table}>
          {/* <Item
            data={{
              name: "Name",
              class: "Class",
              admissionNo: "Adm No.",
              dob: "DOB",
            }}
            index="Sl.No."
          />

          {data.map((item, index) => {
            return <Item data={item} index={index + 1} key={item._id} />;
          })} */}

          <div>
            <input
              type="text"
              placeholder="Search Name/Adm No"
              value={searchQuery}
              onChange={handleSearch}
              className={styles.searchBox}
            />
            {/* <div className={styles.emptyBox}></div> */}
            <div className={styles.tableBox}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th onClick={() => handleSort("name")}>
                      Name {getSortIndicator("name")}
                    </th>
                    <th onClick={() => handleSort("class")}>
                    Class  {getSortIndicator("class")}
                    </th>
                    <th onClick={() => handleSort("admissionNo")}>
                      Adm No. {getSortIndicator("admissionNo")}
                    </th>
                    <th onClick={() => handleSort("dob")}>
                      D.O.B {getSortIndicator("dob")}
                    </th>
                    <th></th>
                  </tr>
                </thead>

                <tbody className={styles.tableBody}>
                  {sortedData.length === 0 ? (
                    <tr>
                      <td colSpan="4">No data found</td>
                    </tr>
                  ) : (
                    sortedData.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.class}</td>
                        <td>{item.admissionNo}</td>
                        <td>{item.dob}</td>
                        <td>
                          <button
                          style={{marginLeft: "30%"}}
                            className={styles.deleteBtn}
                            name=""
                            onClick={() => handleButtonClick(item.duty_id)}
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
    </>
  );
}
