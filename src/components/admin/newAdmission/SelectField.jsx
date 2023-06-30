import React from "react";
import styles from "../../../styles/admin/admission/newAdmission/AllColumns.module.css";

export default function SelectField(props) {
  return (
    <div className={`${styles.subContainerNew}`}>
      <label className={`${styles.label}`}>{props.text}</label>
      <select
        onChange={props.change}
        value={props.value}
        name={props.name}
        className={`${styles.inputFieldNew} ${styles.selectElement}`}
      >
        <option key="default" value="">
          Select
        </option>
        {props.option.map((n) => (
          <option key={n[1]} value={n[1]}>
            {n[0]}
          </option>
        ))}
      </select>
    </div>
  );
}
