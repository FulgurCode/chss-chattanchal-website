import { useNavigate } from "react-router-dom";
import styles from "./Item.module.css";

export default function Item(props) {
  const router = useNavigate();
  return (
    <div className={styles.main}>
      <code className={styles.text}>{props.index}</code>
      <code className={styles.text}>{props.data.name}</code>

      <code className={styles.text}>{props.data.class}</code>

      <code className={styles.text}>{props.data.admissionNo}</code>
      <code className={styles.text}>{props.data.dob}</code>
      <code className={styles.text}>
        <button onClick={() => router({ pathname: "#" })}>verify</button>
      </code>
    </div>
  );
}
