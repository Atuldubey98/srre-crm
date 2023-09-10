import fs from "fs/promises";
import Customer from "../customer-service/customer.model.js";
import csvParser from "csv-parser";
import Address from "../customer-service/address.model.js";
import { loginRequest } from "./auth.js";
/**
 *
 * @param {string} location
 * @returns {Promise<Array>}
 */
export async function getCSVData(location) {
  try {
    const results = [];
    if (!location) {
      throw new Error("No location found");
    }
    const csvData = await fs.readFile(location);
    const stream = csvParser().on("data", (data) => {
      results.push(data);
    });
    stream.write(csvData.toString("utf-8"));
    stream.end();
    return results;
  } catch (error) {
    throw error;
  }
}

async function insertCustomerNameContact(customerNameContacts) {
  return Customer.insertMany(customerNameContacts);
}
const customerCsvAddressMapper = (customerCsvRow) => {
  const { address, city, country, state, zip } = customerCsvRow;
  return {
    location: `${address} ${city} ${country} ${state}-${zip}`,
  };
};

/**
 *
 * @param {{location: string, _id : string}[][]} addressIdList
 * @param {string} createdBy
 * @return {Function}
 */
function customerMapper(addressIdList, createdBy) {
  return (customerCsvRow, index) => ({
    name: `${customerCsvRow.company_name}`,
    contact: {
      name: `${customerCsvRow.first_name} ${customerCsvRow.last_name}`,
      phoneNumber: customerCsvRow.phone1,
    },
    createdBy,
    address: addressIdList[index].map((addressLocation) => addressLocation._id),
  });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}
/**
 *
 * @param {number} totalCustomers
 * @param {{location : string}[]} addressList
 */
function createAddressForAllCustomers(totalCustomers, addressList) {
  const promises = [];
  for (let i = 0; i < totalCustomers; i++) {
    const index = getRandomInt(0, addressList.length);
    promises.push(Address.insertMany(addressList.slice(index)));
  }
  return Promise.all(promises);
}
export async function runCustomers() {
  try {
    const response = await loginRequest();
    await Address.deleteMany({});
    await Customer.deleteMany({});
    const customersCsv = await getCSVData("./assets/customers.csv");
    const addressList = customersCsv.map(customerCsvAddressMapper);
    const addressIdsList = await createAddressForAllCustomers(
      customersCsv.length,
      addressList
    );
    const customers = await insertCustomerNameContact(
      customersCsv.map(customerMapper(addressIdsList, response.user._id))
    );
    return customers;
  } catch (error) {
    throw error;
  }
}
