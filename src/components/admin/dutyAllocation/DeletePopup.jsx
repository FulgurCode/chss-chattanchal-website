import React, { useState } from "react";
import styles from '../../../styles/admin/teachers/dutyAllocation/DeletePopup.module.css'

export default function DeletePopup(props) {
  // const[isView, setIsView] = useState(true);

  function handleClick(){
    props.viewFunct(false)
  }

  return (
    <>
  <div className={styles.outside} onClick={handleClick}>
    <div className={styles.popupBody}>
        <div className={styles.box}> Deleted Successfully </div>
        <div className={styles.buttonWrapper}><button onClick={handleClick}>Close
            </button></div>
        </div>
    </div>
    </>
    )
    
}
