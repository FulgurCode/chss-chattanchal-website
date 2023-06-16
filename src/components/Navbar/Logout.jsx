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
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: "grey",
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                flexDirection: "column",
                gap: 5,
                position: "relative",
                borderWidth: 5,
                borderColor: "black"
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  backgroundColor: "#ccc",
                  borderRadius: 1000,
                  position: "absolute",
                  top: 15

                }}
              ></div>
              <div
                style={{
                  width: 100,
                  height: 100,
                  backgroundColor: "#ccc",
                  borderRadius: 1000,
                  top: 65,
                  position: "absolute"
                }}
              ></div>
            </div>
            <div>
              Logged in as {props.user.toUpperCase()}
            </div>
            <button style={{ fontWeight: 400, backgroundColor: "green" }} onClick={()=>{navigate(`/${props.user}/change-password`)}}>
              Change Password
            </button>
            <button style={{ fontWeight: 400 }} onClick={handleClick}>
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
