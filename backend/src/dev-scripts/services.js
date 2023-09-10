import Service from "../ac-services-service/acServices.model.js";
import { getCSVData } from "./customers.js";

/**
 *
 * @returns {PromiseLike<{typeOfAC : string; serviceName:string; _id: string}[]>}
 */
export async function runServices() {
  await Service.deleteMany({});
  const results = await getCSVData("./assets/services.csv");
  const services = await Service.insertMany(results);
  return services;
}
