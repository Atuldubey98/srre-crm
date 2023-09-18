import axios, { isAxiosError } from "axios";

const baseUrl = import.meta.env.DEV ?  import.meta.env.VITE_API_URL : "/";

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
    if (isAxiosError(error) && error.response?.status === 401) {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);
export default instance;
