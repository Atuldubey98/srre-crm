import express from "express";
import mongoose from "mongoose";
import acServicesRouter from "./ac-services-service/acServices.router.js";
import userRouter from "./auth-service/user.router.js";
import { MONGO_URI } from "./config.js";
import customerRouter from "./customer-service/customer.router.js";
import { errorHandler, logErrors } from "./middlewares/error.middleware.js";
import routeNotFoundMiddleware from "./middlewares/notfound.middleware.js";
import reportRouter from "./report-service/report.router.js";
import technicianRouter from "./technician-service/technican.router.js";
import middlewaresRouter from "./middlewares/index.js";
import adminRouter from "./auth-service/admin.router.js";
import dashboardRouter from "./auth-service/dashboard.router.js";
const app = express();
mongoose.connect(MONGO_URI);

app.use(middlewaresRouter);
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/services", acServicesRouter);
app.use("/api/v1/technicians", technicianRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/service-reports", reportRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.use("*", routeNotFoundMiddleware);
app.use(logErrors);
app.use(errorHandler);
export default app;
