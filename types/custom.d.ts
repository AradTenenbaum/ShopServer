import { Request } from "express";

// Custom type to inject the username when using the auth middleware
declare global {
  namespace Express {
    interface Request {
      username?: string;
    }
  }
}
