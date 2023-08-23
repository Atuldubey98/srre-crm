import instance from "../../instance";

export function getDashboardData() {
  return instance.get("/api/v1/dashboard");
}
export function getCustomerAddressTemplateCsvFile() {
  return instance.get("/api/v1/customers/address/template/download");
}
export function uploadCustomerAddressTemplateCsvFile(
  customerId: string,
  file: File
) {
  const formData = new FormData();
  formData.append("addressList", file);
  return instance.post(
    `/api/v1/customers/${customerId}/address/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}
