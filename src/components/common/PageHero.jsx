import React from "react";
import styles from "../../styles/common/PageHero.module.css"
// import testImage from "../../assets/images/admission/ConfirmIcon.png"
import Breadcrumbs from "./BreadCrumbs";

export default function Hero(props) {
    return(
        <>
            <div className={styles.container}>
                <div className={styles.titleBox}>
                    <img className={styles.titleIcon} src={props.icon} />
                    <label className={styles.title}>{props.title}</label>
                    <div className={styles.lv}></div>
                </div>
                <div className={styles.hl}></div>
                <div className={styles.path}>
                    {/* <span>Home &gt; Admission &gt; <span><b>Student Details</b></span></span> */}
                </div>
                <Breadcrumbs />
            </div>
        </>
    )
}
