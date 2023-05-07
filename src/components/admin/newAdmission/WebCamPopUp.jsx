import React from "react";
import popUpStyles from "../../../styles/admin/admission/newAdmission/PopUp.module.css";

export default function WebCamPop(props) {
  if (props.open == false) {
    return null;
  }

  return (
    <div className={popUpStyles.overlay}>
      <div className={`${popUpStyles.popupBodyWebCam}`}>
        <canvas className={popUpStyles.canvas} ></canvas>
        <button
          onClick={() => {
            props.show(!props.open);
          }}
          className={`${popUpStyles.close}`}
        >
          X
        </button>
        <button className={popUpStyles.clickButton}></button>
      </div>
    </div>
  );
}
