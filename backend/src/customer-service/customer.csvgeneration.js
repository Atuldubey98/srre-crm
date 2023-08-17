export function generateCSVForCustomerServicesCount(
  servicesGivenWithCount = [],
  customerServiceReport,
  fromDate,
  toDate
) {
  const name = customerServiceReport
    ? `Customer Name  : ${customerServiceReport.name}`
    : "All Customers";
  const serviceDatesInterval = `From Date,${
    fromDate || "Since Start"
  }\nTo Date ,${toDate || "Upto Today"}`;
  const csvData = [
    name,
    serviceDatesInterval,
    "",
    "Service Name,Number of Service Given ",
    ...servicesGivenWithCount.map((service) => {
      const { serviceName, noOfTimesServiceUsed } = service;
      return [serviceName, noOfTimesServiceUsed].join(",");
    }),
  ];
  return csvData.join("\n");
}
