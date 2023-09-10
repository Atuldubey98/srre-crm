import Technician from "../technician-service/technician.model";
import { getCSVData } from "./customers";

export async function runTechnicians() {
  await Technician.deleteMany({});
  const results = await getCSVData("./assets/technicians.csv");
  const technicians = await Technician.insertMany(results);
  return technicians;
}
