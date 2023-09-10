import axios from "axios";

let token = "";
/**
 *
 * @param {string} url
 */
export async function getRequest(url) {
  if (!token) {
    await loginRequest();
  }
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  return axios.get(url);
}
export async function loginRequest() {
  const response = await axios.post("http://127.0.0.1:9000/api/v1/auth/login", {
    email: "atuldubey017@gmail.com",
    password: "12345678",
  });
  token = response.data.data.token;
  return response.data.data;
}
