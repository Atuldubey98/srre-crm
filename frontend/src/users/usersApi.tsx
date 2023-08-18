import instance from "../instance";
import { EmployeeUserFormFields } from "./AddNewEmployeeForm";

export async function getUsersList() {
  return instance.get("/api/v1/admin/users");
}
export async function getUserById(userId: string) {
  return instance.get(`/api/v1/admin/users/${userId}`);
}

export async function deleteUserById(userId: string) {
  return instance.delete(`/api/v1/admin/users/${userId}`);
}
export async function registerEmployee(employeeUser: EmployeeUserFormFields) {
  const { confirmPassword, ...user } = employeeUser;
  return instance.post(`/api/v1/admin/users/register`, user);
}
