import React from "react";
import popStyles from "../../../styles/admin/admission/newAdmission/Popup.module.css";
import tick from "/imgs/tick.svg";

export default function SuccessPopup(props) {
  if (props.open == false) {
    return null;
  }

  return (
    <>
      <div className={`${popStyles.overlay}`} />
      <div className={`${popStyles.popupBody}`}>
        <img className={`${popStyles.tickImg}`} src={tick} />
        <label className={`${popStyles.submittedLabel}`}>Submitted successfully</label> 
        <button onClick={()=>{props.show(!props.showVar)}} className={`${popStyles.close}`}>X</button>
      </div>
    </>
  );
}
