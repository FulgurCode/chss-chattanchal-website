import { useNavigate } from "react-router-dom";
import Axios from "../../../stores/Axios";
import styles from "../../styles/Logout.module.css";

export default function Logout(props) {
  const navigate = useNavigate();

  function handleClick() {
    Axios.delete(`/${props.user}/logout`).then((response) => {
      console.log(response.data);
      navigate("/login");
    });
  }

  return (
    <>
      {props.show && (
        <div className={styles.container}>
          <div className={styles.arrow}></div>
          <div className={styles.logoutBody}>
            <button style={{fontWeight:400}} onClick={handleClick}>Logout</button>
          </div>
        </div>
      )}
    </>
  );
}
