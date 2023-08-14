import { Request, Response, NextFunction } from "express";

const logs = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    {
      method: req.method,
      path: req.url,
      data: req.body,
    },
    "REQUEST"
  );
  next();
};

module.exports = logs;
