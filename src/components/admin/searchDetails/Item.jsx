import { useNavigate } from "react-router-dom";
import styles from "../../../styles/admin/admission/studentsDetails/Item.module.css";

export default function Item(props) {
  const router = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          router({
            pathname: "/admin/admission/profile",
            params: {
              ...props.data,
              ...props.data.qualifyingExamDetails,
              ...props.data.tcDetailsOnAdmission,
            },
          });
        }}
        className={styles.main}
      >
        <code className={styles.name}>{props.data.name}</code>
        <code className={styles.admissionNo}>{props.data.admissionNo}</code>
        <code className={styles.class}>{props.data.class}</code>
      </div>
    </>
  );
}
