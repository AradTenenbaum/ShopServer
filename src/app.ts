import express, { Application, NextFunction, Request, Response } from "express";
import CONFIG from "./config";
import cors from "cors";

const logs = require("./middleware/log");
import productsRoute from "./routes/product.routes";
import usersRoute from "./routes/user.routes";

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

export default app;
