import Technician from "../technician-service/technician.model.js";
import { getCSVData } from "./customers.js";

export async function runTechnicians() {
  await Technician.deleteMany({});
  const results = await getCSVData("./assets/technicians.csv");
  const technicians = await Technician.insertMany(results);
  return technicians;
}
