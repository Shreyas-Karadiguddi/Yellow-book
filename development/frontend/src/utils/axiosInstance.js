import axios from "axios";

const IS_DEV = true;
const BACKEND_PORT = 8085;
const BASE_URL = IS_DEV
  ? `${window.location.origin.replace(/:\d+$/, `:${BACKEND_PORT}`)}/api`
  : `${window.location.origin}/api`;

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { axiosInstance };
