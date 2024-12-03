import axios from "axios";
import { getCookie } from "typescript-cookie";

const $authHost = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    AuthToken: `token: ${getCookie("token")}`,
  },
});

export { $authHost };
