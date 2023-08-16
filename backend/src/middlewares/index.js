import compression from "compression";
import cors from "cors";
import express, { Router } from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { NODE_ENV } from "../config.js";
const middlewaresRouter = Router();
const __dirname = path.dirname(new URL(import.meta.url).pathname);
const FRONTEND_LOCATION = path.join(__dirname, "../../../frontend/dist");
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
middlewaresRouter.use(
  express.static(FRONTEND_LOCATION, {
    maxAge: "1y",
  })
);
middlewaresRouter.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nDisallow: /");
});
middlewaresRouter.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api")) {
    next();
  } else {
    return res.sendFile(FRONTEND_LOCATION + "/index.html");
  }
});
middlewaresRouter.get("/api/v1/health", (req, res) => {
  return res.status(200).send("Server is healthy");
});
export default middlewaresRouter;
