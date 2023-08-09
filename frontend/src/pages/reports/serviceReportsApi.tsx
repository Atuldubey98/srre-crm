import instance from "../../instance";

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
