import instance from "../../instance";
import { CustomerServicesUsedCsvGeneratorFormFields } from "./CustomerServicesUsedCsvGenerator";
import { ServiceReportListFormFields } from "./ServiceReportCsvGenerationForm";

import { ReportFormFields } from "./interfaces";

export function getServiceReports(limit: number, skip: number) {
  return instance.get("/api/v1/service-reports", {
    params: {
      limit,
      skip,
    },
  });
}

export function getServiceReportById(reportId: string) {
  return instance.get(`/api/v1/service-reports/${reportId}`);
}
export function deleteServiceReportById(reportId: string) {
  return instance.delete(`/api/v1/service-reports/${reportId}`);
}
export function downloadCustomerServicesCount(
  fields: CustomerServicesUsedCsvGeneratorFormFields
) {
  const { customer, ...params } = fields;
  const url = customer
    ? `/api/v1/customers/${customer}/services/download`
    : `/api/v1/customers/services/download`;
  return instance.get(url, {
    params,
    responseType: "blob",
  });
}
export function downloadServiceReportsByFilter(
  filter: ServiceReportListFormFields
) {
  return instance.get(`/api/v1/service-reports/download`, {
    params: {
      ...filter,
      customer: filter.customer ? filter.customer : undefined,
      customerAddress: filter.customerAddress
        ? filter.customerAddress
        : undefined,
    },
    responseType: "blob",
  });
}

export function createNewServiceReport(report: ReportFormFields) {
  return instance.post("/api/v1/service-reports", {
    ...report,
    acMetaInfo: report.acMetaInfo.map((acmeta) => ({
      ...acmeta,
      _id: undefined,
      tonnage: acmeta.tonnage ? parseFloat(acmeta.tonnage) : 0,
      services: acmeta.services?.map((service) => service._id),
    })),
  });
}
export function updateServiceReport(
  report: ReportFormFields,
  reportId: string
) {
  return instance.patch(`/api/v1/service-reports/${reportId}`, {
    ...report,
    siteContactPerson: {
      ...report.siteContactPerson,
      _id: undefined,
    },
    acMetaInfo: report.acMetaInfo.map((acmeta) => ({
      ...acmeta,
      _id: undefined,

      tonnage: parseFloat(acmeta.tonnage),
      services: acmeta.services?.map((service) => service._id),
    })),
  });
}
