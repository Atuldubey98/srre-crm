import instance from "../../instance";
import { LoginBody } from "./interfaces";

export const login = (loginUser: LoginBody) => {
  return instance.post("/api/v1/auth/login", loginUser);
};
export const currentUserApi = () => {
  return instance.get("/api/v1/auth");
};
