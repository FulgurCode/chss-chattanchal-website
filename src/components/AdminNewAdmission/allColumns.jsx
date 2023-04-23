import styles from "../../styles/AdminNewAdmission/allColumns.module.css"
import React from "react"
import img2 from "../../../public/imgs/image_2.svg";


function AllColumns() {
    return (
        <div className={`${styles.globalParent}`}>
            <div className={`${styles.subContainer}`}>
                <img className={`${styles.img2}`} src={img2} />
                <label className={`${styles.titleLabel}`} >New Admissions</label>
                <hr className={`${styles.stopLine}`} />
            </div>
            <hr className={`${styles.separationLine}`} />
            <div className={`${styles.pathBox}`}>
                <label className={`${styles.pathLabel}`} >Home</label>
                <label className={`${styles.pathLabel}`} >-</label>
                <label className={`${styles.pathLabel}`} >Admissions</label>
                <label className={`${styles.pathLabel}`} >-</label>
                <label className={`${styles.pathLabel}`} >New Admission</label>
            </div>
            <label className={`${styles.mandatoryLabel}`} >Fields marked with <span className={`${styles.aster}`} >  *  </span> are mandatory</label>
            <div className={`${styles.container}`}>
                <div className={`${styles.subContainer}, ${styles.applicationNo}`}>
                    <label className={`${styles.applicationNoLabel}`}>Application number</label>
                    <input className={`${styles.applicationNoInput} ${styles.inputField}`}></input>
                </div>
                <div className={`${styles.subContainer} ${styles.applicationNo}`}>
                    <label className={`${styles.applicationNoLabel}`}>AdmissionLabel</label>
                    <input className={`${styles.applicationNoInput} ${styles.inputField}`}></input>
                </div>
            </div>
            <hr className={`${styles.separationLine} ${styles.separationLineNormal}`} />
        </div>
    )
}

export default AllColumns