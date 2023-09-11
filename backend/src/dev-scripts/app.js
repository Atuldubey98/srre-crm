import * as dotenv from "dotenv";
const path = "../../../.env.development";
dotenv.config({
  path,
});
import mongoose from "mongoose";
import { runCustomers } from "./customers.js";
import { runServices } from "./services.js";
import { runTechnicians } from "./technicians.js";
import { runServiceReports } from "./service-reports.js";

async function main() {
  mongoose.connect(process.env.MONGO_URI);
  const customers = await runCustomers();
  const services = await runServices();
  const technicians = await runTechnicians();
  await runServiceReports(customers, technicians, services);
  await mongoose.disconnect();
}
main();
