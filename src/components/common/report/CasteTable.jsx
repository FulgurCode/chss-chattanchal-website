import { useEffect, useState } from "react";
import styles from "../../../styles/common/reportTables/ReportTables.module.css";
import Axios from "../../../../stores/Axios";

export default function CasteTable(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`/${props.user}/course-caste-report`)
      .then((response) => {
        response.data.map((item) => {
          setData((prevData) => ({
            ...prevData,
            [item.caste]: {
              ...prevData[item.caste],
              [item.course]: item.count,
            },
          }));
        });
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  return (
    <>
      <label>Caste</label>
      <div className={styles.container}>
        <div className={styles.forScroll}>
          <table className={styles.tableMain}>
            <thead>
              <tr className={styles.horizontal}>
                <th className={styles.emptyCell}></th>
                <th>PCMB</th>
                <th>PCMC</th>
                <th>COMMERCE</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item) => {
                return (
                  <tr key={item}>
                    <th className={styles.vheader}>{item}</th>
                    <td>{data[item]["PCMB"] || 0}</td>
                    <td>{data[item]["5_PCMC"] || 0}</td>
                    <td>{data[item]["COMMERCE"] || 0}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
