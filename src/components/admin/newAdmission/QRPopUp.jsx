import React from "react";
import popUpStyles from "../../../styles/admin/admission/newAdmission/Popup.module.css";
import QRCode from "react-qr-code";

export default function QRPopUp(props) {
  if (props.open == false) {
    return null;
  }

  return (
    <div className={popUpStyles.overlay}>
      <div className={`${popUpStyles.popupBody}`}>
        <div className={popUpStyles.QR}>
          <QRCode className={popUpStyles.QR} value={props.text} />
        </div>
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
