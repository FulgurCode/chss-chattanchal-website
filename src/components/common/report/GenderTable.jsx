import { useEffect, useState } from "react";
import styles from "../../../styles/common/reportTables/ReportTables.module.css";
import Axios from "../../../../stores/Axios";

export default function GenderTable(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`/${props.user}/course-gender-report`)
      .then((response) => {
        response.data.map((item) => {
          setData((prevData) => ({
            ...prevData,
            [item.course]: {
              ...prevData[item.course],
              [item.gender]: item.count,
            },
          }));
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  const genderSums = [
    Object.values(data).reduce((acc, item) => acc + (item["male"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["female"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["others"] || 0), 0),
  ];

  return (
    <>
      <label>Gender</label>
      <div className={styles.container}>
        <div className={styles.forScroll}>
          <table className={styles.tableMain}>
            <thead>
              <tr className={styles.horizontal}>
                <th className={styles.emptyCell}></th>
                {/* Empty cell for top-left corner */}
                <th>Boys</th>
                <th>Girls</th>
                <th>Others</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item) => {
                return (
                  <tr key={item}>
                    <th className={styles.vheader}>{item}</th>
                    <td>{data[item]["male"] || 0}</td>
                    <td>{data[item]["female"] || 0}</td>
                    <td>{data[item]["others"] || 0}</td>
                  </tr>
                );
              })}
              <tr key="totals">
                <th className={styles.vheader}>Total</th>
                {genderSums.map((item, index) => {
                  return <td key={index}>{item}</td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
