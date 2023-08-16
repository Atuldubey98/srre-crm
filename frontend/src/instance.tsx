import axios, { isAxiosError } from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

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
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const check = isAxiosError(error) ? error.response?.status === 403 : false;
    if (window.location.pathname !== "/login" && check) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
export default instance;
