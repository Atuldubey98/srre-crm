export interface LoginBody {
  email: string;
  password: string;
}
export interface User {
  email: string;
  _id: string;
  name: string;
  role: "EMPLOYEE" | "ADMIN";
}
