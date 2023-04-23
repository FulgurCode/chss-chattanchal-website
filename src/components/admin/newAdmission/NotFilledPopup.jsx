import React from "react";
import popStyles from "../../../styles/admin/admission/newAdmission/Popup.module.css";
import { render } from "react-dom";
import noTick from "/imgs/notick.svg";

export default function NotFilledPopup(props) {
  if (props.open == false) {
    return null;
  }

  return (
    <>
      <div className={`${popStyles.overlay}`} />
      <div className={`${popStyles.popupBody}`}>
        <img className={`${popStyles.noTickImg}`} src={noTick} />
        <label className={`${popStyles.submittedLabel}`}>
          All fields are not filled
        </label>
        <button
          onClick={() => {
            props.show(!props.showVar);
          }}
          className={`${popStyles.close}`}
        >
          X
        </button>
      </div>
    </>
  );
}
