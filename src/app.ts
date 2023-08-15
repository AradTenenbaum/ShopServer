import express, { Application, NextFunction, Request, Response } from "express";
import CONFIG from "./config";
import cors from "cors";

const serverLog = require("./utils/log");
const cron = require("node-cron");
const logs = require("./middleware/log");
import productsRoute from "./routes/product.routes";
import usersRoute from "./routes/user.routes";
import { fetchDataFromFile } from "./utils/file";
import { ProductsInterface } from "./interfaces/products.interface";
import { fetchFromAmazonToProducts } from "./services/crawler.service";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: CONFIG.CLIENT_URL,
  })
);
app.use(logs);

app.use("/product", productsRoute);
app.use("/user", usersRoute);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send({ message: "Server is running..." });
});

cron.schedule("* */60 * * * *", () => {
  const tempProducts: ProductsInterface =
    fetchDataFromFile("data/products.json");
  Object.keys(tempProducts).forEach((search) => {
    fetchFromAmazonToProducts(search);
  });
  serverLog({ message: `Products are updated` });
});

export default app;
