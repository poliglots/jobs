import fs from "node:fs";
import readline from "node:readline";
import { type JobLog } from "./store.ts";
import { JOBS_JSON_FILE, JOBS_TEXT_FILE } from "./config.ts";

async function winstonLogFile2Json(filePath: string, jsonFilePath: string) {
  const logArray: JobLog[] = [];
  try {
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      if (!line.trim()) continue;
      try {
        const jobLog: JobLog = JSON.parse(line);
        jobLog.level = jobLog.source ?? "aws";
        jobLog.message = jobLog.description.split(".").slice(0, 3).join(".").concat(".");
        if (jobLog.id && jobLog.title) {
          logArray.push(jobLog);
        }
      } catch {
        console.warn("Skipping malformed log line");
      }
    }

    const uniqueLogs = logArray.filter(
      (obj, index, self) =>
        index === self.findIndex((item) => item.id === obj.id)
    );
    fs.writeFileSync(jsonFilePath, JSON.stringify(uniqueLogs, null, 2));
  } catch (error) {
    console.error("Error in parsing/writing logs:", error);
  }
}

await winstonLogFile2Json(JOBS_TEXT_FILE, JOBS_JSON_FILE);
