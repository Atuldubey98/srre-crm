import express from "express";
import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";
import { errorHandler, logErrors } from "./middlewares/error.middleware.js";
import customerRouter from "./customer-service/customer.router.js";
import userRouter from "./auth-service/user.router.js";
import cors from "cors";
import acServicesRouter from "./ac-services-service/acServices.router.js";
import routeNotFoundMiddleware from "./middlewares/notfound.middleware.js";
import technicianRouter from "./technician-service/technican.router.js";
import reportRouter from "./report-service/report.router.js";
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(MONGO_URI);
app.get("/api/v1/health", (req, res, next) => {
  return res.status(200).send("Server is healthy");
});
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/services", acServicesRouter);
app.use("/api/v1/technicians", technicianRouter);
app.use("/api/v1/service-reports", reportRouter);
app.use("*", routeNotFoundMiddleware);
app.use(logErrors);
app.use(errorHandler);
export default app;

