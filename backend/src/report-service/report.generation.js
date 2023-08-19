import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
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

export async function generateHTMlForPdfOfReport(report) {
  const reportId = report._id;
  const customerName = report.customer.name;
  const modelNumbers = report.acMetaInfo
    .filter((acmeta) => acmeta.modelNumber)
    .map((acmeta) => acmeta.modelNumber)
    .join(",");
  const description = `${report.acMetaInfo
    .map(
      (acmeta, index) =>
        `${index + 1} : ${acmeta.tonnage || ""} ${acmeta.modelNumber || ""} ${
          acmeta.typeOfAC || ""
        }-${acmeta.services.map((service) => service.serviceName).join(",")} `
    )
    .join("\n")} ;Work Description : ${report.description}`;
  const identification = report.siteContactPerson?.identification || "";
  const contactNumber = report.siteContactPerson?.contactNumber || "";
  const technicanName = report.technician.name;
  const customerAddress = report.customerAddress.location;
  const currentModulePath = fileURLToPath(import.meta.url);
  const currentDirectory = dirname(currentModulePath);
  const logoPath = path.join(currentDirectory, "../assets/logo.webp");
  const srreLogoData = await fs.readFile(logoPath, "base64");
  const blutStarLogoPath = path.join(
    currentDirectory,
    "../assets/bluestar.webp"
  );
  const srreLogoSrc = `data:image/webp;base64,${srreLogoData}`;
  const blueStarLogoData = await fs.readFile(blutStarLogoPath, "base64");
  const bluestarStarLogoData = `data:image/webp;base64,${blueStarLogoData}`;
  const reportHTML = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SRRE - Service Report</title>
      <style>
        header {
          border-bottom: 2px solid black;
        }
        .header__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: small;
          padding-block: 0.8rem;
        }
        .d-flex-between {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .header__left {
          flex: 2;
        }
        .header__center {
          flex: 7;
          line-height: 1.5rem;
          width: 100%;
        }
        .text-center {
          text-align: center;
        }
        .text-left {
          text-align: left;
        }
        .header__right {
          list-style: none;
          flex: 3;
          width: 100%;
        }
        .header__mainHeading {
          color: #1e9de2;
        }
        .small {
          font-size: smaller;
        }
        .field__name {
          font-weight: bold;
        }
        .underline {
          text-decoration: underline;
        }
        .table__body {
          border-top: 2px solid black;
          border-left: 2px solid black;
          border-right: 2px solid black;
          font-size: small;
        }
        .report__meta{
          margin-block: 0.5rem;
        }
        .row {
          border-bottom: 2px solid black;
          padding: 0.5rem;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      </style>
    </head>
    <body>
      <header>
        <div class="header__wrapper d-flex-between">
          <section class="header__left">
            <img
              src="${srreLogoSrc}"
              alt="SRRE-logo"
              width="100"
              height="50"
            />
          </section>
          <section class="header__center text-center">
            <h3><u>SERVICE REPORT</u></h3>
            <h1 class="header__mainHeading">
              <b>S R REFRIGERATION AND ELECTRICALS</b>
            </h1>
            <p>(ENGINEERS AND CONTRACTORS)</p>
          </section>
          <ul class="header__right text-left">
            <li><a href="tel:9871009013">9871009013</a></li>
            <li><a href="tel:9871009013">8700228601</a></li>
          </ul>
        </div>
        <p class="small text-center">
          Spl in : All types of Air Conditioners, Refrigerators, Central Plant,
          Ducting & Electrical Services
        </p>
      </header>
      <main>
        <section class="header__bottom">
          <div class="address">
            <div class="field">
              <span class="field__name">Registered Office</span>
              <span class="field__value">
                E - 160 Street Number - 3 West Vinod Nagar, Shanti Marg Delhi - 92
              </span>
            </div>
            <div class="field">
              <span class="field__name">Workshop</span>
              <span class="field__value">
                6-G Nyaykhand - I, Indirapuram, Ghaziabad UP-201301
              </span>
            </div>
          </div>
          <div class="bluestar__logo">
            <img
              src="${bluestarStarLogoData}"
              alt="Blue star logo"
              width="190"
              height="60"
            />
          </div>
        </section>
        <section class="report__meta d-flex-between">
          <div class="field">
            <span class="field__name">No:</span>
            <span class="field__value underline">${reportId}</span>
          </div>
          <div class="field">
            <span class="field__name">Date :</span>
            <span class="field__value underline">${getDateForField(
              report.serviceDate
            )}</span>
          </div>
        </section>
        <section class="table__body">
          <div class="row grid-2">
            <div class="field">
              <span class="field__name">Customer Name :</span>
              <span class="field__value underline">${customerName}</span>
            </div>
            <div class="field">
              <span class="field__name">Call Number:</span>
              <span class="field__value underline"></span>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <span class="field__name">Customer Address :</span>
              <span class="field__value underline">${customerAddress}</span>
            </div>
            <div class="grid-2">
              <div class="field">
                <span class="field__name">Customer Contact Identification :</span>
                <span class="field__value underline">${identification}</span>
              </div>
              <div class="field">
                <span class="field__name">Customer Phone Number :</span>
                <span class="field__value underline">${contactNumber}</span>
              </div>
            </div>
            <div class="grid-2">
              <div class="field">
                <span class="field__name">Service Man Name :</span>
                <span class="field__value underline">${technicanName}</span>
              </div>
              <div class="field">
                <span class="field__name">Service Man Sign :</span>
                <span class="field__value underline"></span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <span class="field__name">Job or work Description:</span>
              <span class="field__value">${description}</span>
            </div>
          </div>
          <div class="row">
            <div class="grid-2">
              <div class="grid__left">
                <div class="field">
                  <span class="field__name">Model Numbers : </span>
                  <span class="field__value underline">${modelNumbers}</span>
                </div>
                <div class="field">
                  <span class="field__name">Work Status : </span>
                  <span class="field__value underline">${report.status}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="field">
              <span class="field__name">Client Signature</span>
              <span class="field__value"></span>
            </div>
          </div>
        </section>
      </main>
    </body>
  </html>
  `;
  return reportHTML;
}
