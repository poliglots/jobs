import winston from "winston";
import { JOBS_TEXT_FILE } from "./config.ts";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: JOBS_TEXT_FILE,
      options: { flags: "w" }, //this overwrites log on every new run
    }),

    // new winston.transports.Console(), // Optional: still log to console
  ],
});
