import * as dotenv from "dotenv";
const path = "../../../.env.development";
dotenv.config({
  path,
});
import mongoose from "mongoose";
import { runCustomers } from "./customers.js";
import { runServices } from "./services.js";

async function main(){
    mongoose.connect(process.env.MONGO_URI);
    await runCustomers();
    await runServices();
    await mongoose.disconnect()
}
main();