import styles from "../../styles/teacher/Otp.module.css";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function LoginElement(props) {
  const [otp, setOtp] = useState("");
  return (
    <div className={styles.loginElement}>
      <span className={styles.containerspan}>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className={styles.svg}
        >
          <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
        </svg>
        <h2>Enter OTP</h2> */}

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<pre> </pre>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{ width: 50 }}
        />
        {/* <code>Enter the OTP send to your email</code>
        <button>VERIFY</button>
        <input type="button" value="Resend OTP" /> */}
      </span>
    </div>
  );
}

function Input() {
  return (
    <div>
      {/* <form> */}
      <input type="text" maxLength="1" />
      <input type="text" maxLength="1" />
      <input type="text" maxLength="1" />
      <input type="text" maxLength="1" />
      <input type="text" maxLength="1" />
      <input type="text" maxLength="1" />
      {/* </form> */}
    </div>
  );
}
