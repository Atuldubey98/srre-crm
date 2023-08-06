import axios from "axios";

const baseUrl = "http://localhost:9000";

const instance = axios.create({
  baseURL: baseUrl,
});
instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
