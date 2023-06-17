import React from "react";
import styles from "../../../styles/admin/admission/newAdmission/AllColumns.module.css";

export default function Field(props) {
  return (
    <div style={props.styling} className={props.containerClass}>
      <label className={`${styles.label}`}>
        {props.text}{" "}
        {!props.notRequired ? (
          <span className={`${styles.aster}`}> * </span>
        ) : (
          ""
        )}
      </label>
      <input
        type={props.type}
        accept={props.extention}
        min={props.min}
        max={props.max}
        onChange={props.change}
        value={props.value}
        name={props.name}
        className={`${props.inputStyle} ${styles.inputFieldNew}`}
        ref={props.reference}
      ></input>
    </div>
  );
}
