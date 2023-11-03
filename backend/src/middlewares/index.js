import compression from "compression";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import httpStatusCodes from "http-status-codes";
import morgan from "morgan";
import { NODE_ENV } from "../config.js";
const middlewaresRouter = Router();

middlewaresRouter.use(express.json());
middlewaresRouter.use(
  compression({
    filter: (req, res) => {
      if (req.headers["x-no-compression"]) {
        return false;
      }
      return compression.filter(req, res);
    },
  })
);
middlewaresRouter.use(helmet());
middlewaresRouter.use(cors());
middlewaresRouter.use(morgan(NODE_ENV === "development" ? "dev" : "combined"));
middlewaresRouter.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});

middlewaresRouter.get("/api/v1/health", (req, res) => {
  return res
    .status(httpStatusCodes.OK)
    .send(httpStatusCodes.getStatusText(httpStatusCodes.OK));
});
export default middlewaresRouter;
