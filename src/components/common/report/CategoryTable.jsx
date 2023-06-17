import { useEffect, useState } from "react";
import styles from "../../../styles/common/reportTables/ReportTables.module.css";
import Axios from "../../../../stores/Axios";

export default function CategoryTable(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    Axios.get(`/${props.user}/course-category-report`)
      .then((response) => {
        response.data.map((item) => {
          setData((prevData) => ({
            ...prevData,
            [item.course]: {
              ...prevData[item.course],
              [item.category]: item.count,
            },
          }));
        });
      })
      .catch((error) => {
      });
  }, []);

  const statusSums = [
    Object.values(data).reduce((acc, item) => acc + (item["General"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["Hin.OBC"] || 0), 0),
    Object.values(data).reduce(
      (acc, item) => acc + (item["Christ.OBC"] || 0),
      0
    ),
    Object.values(data).reduce((acc, item) => acc + (item["OEC"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["Muslim"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["SC"] || 0), 0),
    Object.values(data).reduce((acc, item) => acc + (item["ST"] || 0), 0),
  ];

  return (
    <>
      <label>Category</label>
      <div className={styles.container}>
        <div className={styles.forScroll}>
          <table className={styles.tableMain}>
            <thead>
              <tr className={styles.horizontal}>
                <th className={styles.emptyCell}></th>
                <th>General</th>
                <th>Hindu OBC</th>
                <th>Christ OBC</th>
                <th>OEC</th>
                <th>Muslim</th>
                <th>SC</th>
                <th>ST</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(data).map((item) => {
                return (
                  <tr key={item}>
                    <th className={styles.vheader}>{item}</th>
                    <td>{data[item]["General"] || 0}</td>
                    <td>{data[item]["Hin.OBC"] || 0}</td>
                    <td>{data[item]["Christ.OBC"] || 0}</td>
                    <td>{data[item]["OEC"] || 0}</td>
                    <td>{data[item]["Muslim"] || 0}</td>
                    <td>{data[item]["SC"] || 0}</td>
                    <td>{data[item]["ST"] || 0}</td>
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
