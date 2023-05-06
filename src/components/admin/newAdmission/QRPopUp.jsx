import React from "react";
import popUpStyles from "../../../styles/admin/admission/newAdmission/PopUp.module.css";
import QRCode from "react-qr-code";

export default function QRPopUp(props) {
  if (props.open == false) {
    return null;
  }

  return (
    <div className={popUpStyles.overlay}>
      <div className={`${popUpStyles.popupBody}`}>
        <QRCode value={props.text} />
        <button
          onClick={() => {
            props.show(!props.open);
          }}
          className={`${popUpStyles.close}`}
        >
          X
        </button>
      </div>
    </div>
  );
}
