const path = require("path");
import fs from "fs";
const serverLog = require("../utils/log");
import { ProductsInterface } from "../interfaces/products.interface";
import { getParentPathByLevels } from "./string";

export function saveDataToFile(filename: string, data: ProductsInterface) {
  const jsonData = JSON.stringify(data, null, 2);
  const dirPath = getParentPathByLevels(__dirname, 1) + "\\data";
  const fullPath = path.resolve(getParentPathByLevels(__dirname, 1), filename);

  // If data dir not exists create it
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Write to file
  fs.writeFileSync(fullPath, jsonData, "utf-8");

  serverLog({ message: `Data saved to ${filename}` });
}

export function fetchDataFromFile(filename: string): ProductsInterface {
  const fullPath = path.resolve(getParentPathByLevels(__dirname, 1), filename);

  // If path not exists return empty object
  if (!fs.existsSync(fullPath)) {
    return {};
  }

  const jsonData = fs.readFileSync(fullPath, "utf-8");
  return JSON.parse(jsonData);
}
