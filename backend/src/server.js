import app from "./app.js";
import http from "http";
import { PORT } from "./config.js";

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log("Server is running");
});
