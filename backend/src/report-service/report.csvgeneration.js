function getDateForField(dateString) {
  const dateObject = new Date(dateString);

  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
export function getReportsCSVFileData(reports) {
  if (!Array.isArray(reports)) {
    return [];
  }

  const heading = [
    "Report Id",
    "Report Date",
    "Customer Name",
    "Site Address",
    "Work Done",
    "Technician Name",
    "Work Description",
    "Site Contact Person Identification",
    "Work Status",
    "Description",
  ];

  function helperForRemovingComma(value) {
    if (typeof value === "string") {
      return `"${value.replace(/"/g, '""')}"`;
    }
    return "";
  }
  function getField({ value = "", field = "" }) {
    return value ? `${field} : ${value}` : "";
  }
  const dataRows = reports.map((report) => {
    const reportId = report._id;
    const serviceDate = helperForRemovingComma(
      getDateForField(report.serviceDate)
    );
    const customerName = helperForRemovingComma(report.customer.name);
    const customerAddress = helperForRemovingComma(
      report.customerAddress.location
    );
    const workDone = helperForRemovingComma(
      report.acMetaInfo
        .map(
          (acmeta) =>
            `${getField({
              field: "TR",
              value: acmeta.tonnage,
            })} ; ${getField({
              field: "Services Done",
              value: acmeta.services
                .map((service) => `${acmeta.typeOfAC} ${service.serviceName}`)
                .join(","),
            })}`
        )
        .join("\n")
    );
    const technicanName = helperForRemovingComma(report.technician.name);
    const machineDetails = helperForRemovingComma(
      report.acMetaInfo
        .map(
          (acmeta) =>
            `${getField({
              field: "Model Number",
              value: acmeta.modelNumber,
            })} ; ${getField({
              field: "Type of AC",
              value: acmeta.typeOfAC,
            })}`
        )
        .join("\n")
    );
    const siteContactPersonID = helperForRemovingComma(
      getField({
        field: "ID or Name",
        value: report.siteContactPerson?.identification || "",
      })
    );
    const status = report.status;
    const description = helperForRemovingComma(report.description || "");
    return `${reportId},${serviceDate},${customerName},${customerAddress},${workDone},${technicanName},${machineDetails},${siteContactPersonID},${status},${description}`;
  });
  return [heading.join(","), ...dataRows];
}
