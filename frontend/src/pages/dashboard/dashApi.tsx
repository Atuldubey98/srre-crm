import instance from "../../instance";

export function getDashboardData() {
  return instance.get("/api/v1/dashboard");
}
export function downloadServicesTemplate() {
  return instance.get("/api/v1/services/template");
}
export function getCustomerAddressTemplateCsvFile() {
  return instance.get("/api/v1/customers/address/template");
}
export function uploadCustomerAddressTemplateCsvFile(
  customerId: string,
  file: File
) {
  const formData = new FormData();
  formData.append("addressList", file);
  return instance.post(
    `/api/v1/customers/${customerId}/address/template`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
}

export function uploadServicesTemplate(file: File) {
  const formData = new FormData();
  formData.append("services", file);
  return instance.post(`/api/v1/services/template`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
