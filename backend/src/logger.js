import { createLogger, format, transports } from "winston";
const logger = createLogger({
  level: "http",
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.simple()
  ),
  transports: [new transports.Console()],
});

export default logger;
