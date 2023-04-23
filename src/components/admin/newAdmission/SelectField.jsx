import React from 'react'
import styles from "../../../styles/admin/admission/newAdmission/AllColumns.module.css"

export default function SelectField(props) {

  return (
    <div className={`${styles.subContainerNew}`}>
          <label className={`${styles.label}`}>
            {props.text}    <span className={`${styles.aster}`}> * </span>
          </label>
          <select
            onChange={props.change}
            name={props.name}
            className={`${styles.inputFieldNew} ${styles.selectElement}`}
          >

          {props.option.map((n) => {return <option key={n} value={n[1]}>{n[0]}</option>})}
          </select>
        </div>
  )
}
