import winston from "winston";
import path from "path";
import fs from "fs";
import { config } from "../config";

// Create logs directory if it doesn't exist
const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json(),
);

// Define custom colorized format for console
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return `[${timestamp}] ${level}: ${message} ${stack ? "\\n" + stack : ""}`;
  }),
);

// Create the logger
const logger = winston.createLogger({
  level: config.NODE_ENV === "development" ? "debug" : "info",
  format: logFormat,
  transports: [
    // Write all related error logs to `error.log`
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Write all logs (info, warn, error) to `combined.log`
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
});

// If we're not in production, log to the console with the custom format
if (config.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: consoleFormat,
    }),
  );
}

// Define a stream object that Morgan can use to write logs using Winston
export const morganStream = {
  write: (message: string) => {
    // Morgan adds a newline by default, so we trim it to avoid empty lines in logs
    logger.info(message.trim());
  },
};

export default logger;
