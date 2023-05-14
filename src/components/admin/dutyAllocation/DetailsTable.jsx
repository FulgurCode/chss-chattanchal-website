import React, { useState, useEffect } from "react";
import styles from "../../../styles/admin/teachers/dutyAllocation/DetailsTable.module.css"; // Import the CSS module
import Axios from "../../../../stores/Axios";
import DeletePopup from "./DeletePopup";

function Table(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState("name"); // Set the initial sort column to 'name'
  const [sortOrder, setSortOrder] = useState("asc"); // Set the initial sort order to 'asc'

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

  const filteredData = props.data.filter((item) => {
    const { name, penNumber } = item;
    const searchFields = `${name}${penNumber}`.toLowerCase();
    return searchFields.includes(searchQuery.toLowerCase());
  });

  const sortedData = filteredData.sort((a, b) => {
    if (sortColumn) {
      const columnA = a[sortColumn];
      const columnB = b[sortColumn];

      if (columnA < columnB) {
        return sortOrder === "asc" ? -1 : 1;
      }
      if (columnA > columnB) {
        return sortOrder === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const getSortIndicator = (column) => {
    if (sortColumn === column) {
      return sortOrder === "asc" ? "▲" : "▼";
    }
    return "";
  };

  // Deleting duty from the database

  return (
    <div>
      <input
        type="text"
        placeholder="Search Name/Pen No"
        value={searchQuery}
        onChange={handleSearch}
        className={styles.searchBox}
      />
      {/* <div className={styles.emptyBox}></div> */}
      <div className={styles.tableBox}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.normalH} onClick={() => handleSort("name")}>
                Name {getSortIndicator("name")}
              </th>
              <th
                className={styles.normalH}
                onClick={() => handleSort("penNumber")}
              >
                Pen Number {getSortIndicator("penNumber")}
              </th>
              <th className={styles.normalH} onClick={() => handleSort("duty")}>
                Duty {getSortIndicator("duty")}
              </th>
              <th className={styles.deleteHeader}>Delete</th>
            </tr>
          </thead>

          <tbody className={styles.tableBody}>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="4">No data found</td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr key={item.id}>
                  <td className={styles.normalB}>{item.name}</td>
                  <td className={styles.normalB}>{item.penNumber}</td>
                  <td className={styles.normalB}>{item.duty}</td>
                  <td className={styles.deleteBody}>
                    <button
                      className={styles.deleteBtn}
                      name=""
                      onClick={() => props.deleteFunction(item.duty_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
