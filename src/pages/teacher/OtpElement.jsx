import styles from "../../styles/teacher/Otp.module.css";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

export default function LoginElement(props) {
  return (
    <div className={styles.loginElement}>
      <span className={styles.containerspan}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className={styles.svg}
        >
          <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
        </svg>
        <h2 style={{ margin: 0 }}>Enter OTP</h2>

        <code>Enter the OTP send to your email</code>
        <OtpInput
          value={props.otp}
          onChange={props.setOtp}
          numInputs={6}
          renderSeparator={<pre> </pre>}
          renderInput={(props) => <input {...props} />}
          containerStyle={{
            justifyContent: "center",
            marginTop: 20,
            height: 40,
          }}
          inputStyle={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: "1px solid black",
            fontSize: 20,
            inputType: "number",
          }}
        />
        <code
          style={{
            color: "red",
            fontSize: 13,
            fontFamily: "IBM Plex Mono,Comic Sans, Comic Sans MS",
            marginBottom: 15,
          }}
        >
          {props.error}
        </code>

        <button
          onClick={props.handleClick}
          style={{
            backgroundColor: props.otp.length == 6 ? "#28b4ab" : "grey",
          }}
        >
          VERIFY
        </button>
        <input type="button" value="Resend OTP" className={styles.input} />
      </span>
    </div>
  );
}
