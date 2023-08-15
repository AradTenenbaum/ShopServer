import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    // Try to verify the token
    const decodedToken = jwt.verify(token, config.JWT_KEY as Secret) as {
      username: string;
    };

    // Set the username that received by the token
    req.username = decodedToken.username;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
