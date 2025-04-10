import { createLogger, format, transports }  from "winston";


const logger = createLogger({
  level: "info", // Log levels: error, warn, info, debug
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
  ),
  transports: [
    new transports.Console(), // Logs to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // Logs errors only
    new transports.File({ filename: "logs/combined.log" }) // Logs all messages
  ],
});

export default logger;