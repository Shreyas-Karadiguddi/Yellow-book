import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://backend:8085/api`,
});

const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export { axiosInstance };
