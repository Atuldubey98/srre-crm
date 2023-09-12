import { getRandomInt } from "./customers.js";
import Report from "../report-service/report.model.js";
/**
 *
 * @param {Date} minDate
 * @param {Date} maxDate
 * @returns {Date}
 */
function getRandomDate(minDate, maxDate) {
  const minTime = minDate.getTime();
  const maxTime = maxDate.getTime();
  const timeDifference = maxTime - minTime;

  const randomTime = minTime + Math.random() * timeDifference;

  const randomDate = new Date(randomTime);

  return randomDate;
}
/**
 *
 * @param {import("../../types/dev-scripts/customer").Customer[]} customers
 * @param {import("../../types/dev-scripts/technician").Technician[]} technicians
 * @param {import("../../types/dev-scripts/services").Service[]} services
 */
export async function runServiceReports(customers, technicians, services) {
  await Report.deleteMany({});
  const customerServiceReports = [];
  customers.forEach((customer) => {
    const { _id: customerId, ...restCustomer } = customer;
    for (let i = 0; i < 2; i++) {
      const randomIndexAddress = getRandomInt(
        0,
        restCustomer._doc.address.length
      );
      const randomIndexService = getRandomInt(0, services.length);
      const randomIndexTechnician = getRandomInt(0, technicians.length);
      const customerAddress = restCustomer._doc.address[randomIndexAddress]._id;
      const technician = technicians[randomIndexTechnician]._id;
      const service = services[randomIndexService]._id;
      const siteContactPerson = {
        identification: "Ramu Sharma",
        contactNumber: "9911409345",
      };
      const status = "Complete";
      const description = "Work Complete";
      const acMetaInfo = [
        {
          tonnage: 5,
          modelNumber: "BX-564145454564",
          typeOfAC: "otherac",
          services: [service],
        },
      ];
      const serviceDate = getRandomDate(
        new Date("2023-08-12"),
        new Date("2023-09-12")
      );
      const serviceReport = {
        customer: customerId,
        status,
        description,
        acMetaInfo,
        serviceDate,
        siteContactPerson,
        technician,
        customerAddress,
      };
      customerServiceReports.push(serviceReport);
    }
  });
  await Report.insertMany(customerServiceReports);
}
