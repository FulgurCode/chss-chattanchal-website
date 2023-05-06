import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
// import userouter
import styles from "../../../styles/admin/admission/studentsDetails/Item.module.css";

export default function Item(props) {
  const navigate = useNavigate();

  return (
    <>
      <div
        onClick={() => {
          navigate({
            pathname: "/admin/admission/profile",
            search: `?${createSearchParams({ id: props.data._id })}`,
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
