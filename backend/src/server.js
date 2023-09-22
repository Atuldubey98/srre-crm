import app from "./app.js";
import http from "http";
import { PORT } from "./config.js";
import mongoose from "mongoose";

import cluster from "cluster";
import { cpus } from "os";
import logger from "./logger.js";
const noOfCpus = cpus().length;
if (cluster.isPrimary) {
  for (let i = 0; i < noOfCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    logger.info(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    logger.info("Server is running");
  });
  process.on("SIGTERM", () => {
    logger.info("SIGTERM signal received.");
    server.close(() => {
      logger.warn("Http server closed.");
      mongoose.connection.close(false, () => {
        logger.warn("MongoDb connection closed.");
      });
    });
  });
}
