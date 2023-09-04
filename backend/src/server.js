import app from "./app.js";
import http from "http";
import { PORT } from "./config.js";
import mongoose from "mongoose";

import cluster from "cluster";
import { availableParallelism } from "os";
const noOfCpus = availableParallelism();
if (cluster.isPrimary) {
  for (let i = 0; i < noOfCpus; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log("Server is running");
  });
  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received.");
    console.log("Closing http server.");
    server.close(() => {
      console.log("Http server closed.");
      mongoose.connection.close(false, () => {
        console.log("MongoDb connection closed.");
      });
    });
  });
}
