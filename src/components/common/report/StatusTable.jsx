import { useEffect, useState } from "react";
import styles from "../../../styles/common/reportTables/ReportTables.module.css";
import Axios from "../../../../stores/Axios";

export default function StatusTable(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`/${props.user}/course-status-report`)
      .then((response) => {
        response.data.map((item) => {
          setData((prevData) => ({
            ...prevData,
            [item.course]: {
              ...prevData[item.course],
              [item.status]: item.count,
            },
          }));
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  const statusSums = [
    Object.values(data).reduce(
      (acc, item) => acc + (item["permanent"] || 0),
      0
    ),
    Object.values(data).reduce(
      (acc, item) => acc + (item["temporary"] || 0),
      0
    ),
    Object.values(data).reduce((acc, item) => acc + (item["pending"] || 0), 0),
  ];

  return (
    <>
      <label>Status</label>
      <div className={styles.container}>
        <div className={styles.forScroll}>
          <table className={styles.tableMain}>
            <thead>
              <tr className={styles.horizontal}>
                <th className={styles.emptyCell}></th>
                {/* Empty cell for top-left corner */}
                <th>Permanent</th>
                <th>Temporary</th>
                <th>Pending</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item) => {
                return (
                  <tr key={item}>
                    <th className={styles.vheader}>{item}</th>
                    <td>{data[item]["permanent"] || 0}</td>
                    <td>{data[item]["temporary"] || 0}</td>
                    <td>{data[item]["pending"] || 0}</td>
                  </tr>
                );
              })}
              <tr key="totals">
                <th className={styles.vheader}>Total</th>
                {statusSums.map((item, index) => {
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
