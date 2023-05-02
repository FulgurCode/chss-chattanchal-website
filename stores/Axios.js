import axios from "axios";

var Axios = axios.create({
  baseURL: "http://localhost:9000/api/admin/",
  withCredentials: true,
});

export default Axios;
