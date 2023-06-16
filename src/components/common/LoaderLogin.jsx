import styles from "../../styles/LoaderLogin.module.css";
import React from "react";

export default function Loader(props) {
  return (
    <div>
      {props.open && (
        <div>
          <div className={styles.loader}></div>
        </div>
      )}
    </div>
  );
}
