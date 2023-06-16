import Axios from "./Axios";

export function useAuth(setState, navigate) {
  const checkLogin = async () => {
    while (true) {
      setState(true);
      try {
        const response = await Axios.get("/admin/checklogin");
        const isLoggedIn = response.data;
        if (!isLoggedIn) {
          navigate("/login");
        }
        setState(false);
        break;
      } catch (error) {
        // Add a time delay before retrying the request
        await delay(3000); // Adjust the delay time as needed (e.g., 3000 milliseconds)
        setState(true);
      }
    }
  };

  const delay = (time) => new Promise((resolve) => setTimeout(resolve, time));

  checkLogin();

  return null;
}
