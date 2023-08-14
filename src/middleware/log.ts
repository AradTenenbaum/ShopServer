import { Request, Response, NextFunction } from "express";
const { REQUEST } = require("../utils/constants");

const logs = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    method: req.method,
    path: req.url,
    data: req.body,
    type: REQUEST,
  });
  next();
};

module.exports = logs;
