import axios from "axios";

var Axios = axios.create({
  baseURL: "http://localhost:9000/api/",
  withCredentials: true,
});

export default Axios;
