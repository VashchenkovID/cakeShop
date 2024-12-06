import axios from "axios";
import Cookies from "js-cookie";

const $authHost = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    AuthToken: `token: ${Cookies.get("token")}`,
  },
});

export { $authHost };
