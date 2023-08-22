import instance from "../../instance";

export function getDashboardData() {
  return instance.get("/api/v1/dashboard");
}