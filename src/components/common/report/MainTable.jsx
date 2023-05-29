import { useEffect, useState } from "react";
import styles from "../../../styles/common/reportTables/ReportTables.module.css";
import Axios from "../../../../stores/Axios";

export default function MainTable(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`/${props.user}/course-language-report`)
      .then((response) => {
        response.data.map((item) => {
          setData((prevData) => ({
            ...prevData,
            [item.course]: {
              ...prevData[item.course],
              [item.secondLanguage]: item.count,
            },
          }));
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  const langSums = [
    Object.values(data).reduce(
      (acc, item) => acc + (item["Malayalam"] || 0),
      0
    ),
    Object.values(data).reduce((acc, item) => acc + (item["Hindi"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["Arabic"] || 0), 0),
  ];

  return (
    <>
      <label>Language</label>
      <div className={styles.container}>
        <div className={styles.forScroll}>
          <table className={styles.tableMain}>
            <thead>
              <tr className={styles.horizontal}>
                <th className={styles.emptyCell}> </th>
                {/* Empty cell for top-left corner */}
                <th className={styles.hheader}>Malayalam</th>
                <th className={styles.hheader}>Hindi</th>
                <th className={styles.unique}>Arabic</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item) => {
                return (
                  <tr key={item}>
                    <th className={styles.vheader}>{item}</th>
                    <td>{data[item]["Malayalam"] || 0}</td>
                    <td>{data[item]["Hindi"] || 0}</td>
                    <td>{data[item]["Arabic"] || 0}</td>
                  </tr>
                );
              })}
              <tr key="totals">
                <th className={styles.vheader}>Total</th>
                {langSums.map((item, index) => {
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
