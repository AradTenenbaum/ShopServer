import { INFO } from "./constants";

function serverLog(details: any, type: string) {
  console.log({ type: type || INFO, ...details });
}

module.exports = serverLog;
