import express, { Application, NextFunction, Request, Response } from "express";
import CONFIG from "./config";
import cors from "cors";
const serverLog = require("./utils/log");

const logs = require("./middleware/log");
const productsRoute = require("./routes/product");

const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(logs);

app.use("/product", productsRoute);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.send("Server is running...");
});

const PORT = CONFIG.PORT || 3000;

app.listen(PORT, () => {
  serverLog({ message: `Server is listening on port ${PORT}` });
});
