import Axios from "./Axios";
import { useNavigate } from "react-router-dom";

export function useAuth(setState, navigate) {
  const checkLogin = async () => {
    while (true) {
      setState(true);
      try {
        const response = await Axios.get("/teacher/checklogin");
        const isLoggedIn = response.data;
        if (!isLoggedIn) {
          navigate("/login");
        }
        setState(false);
        break;
      } catch (error) {
        setState(false);
      }
    }
  };

  checkLogin();

  return null;
}
