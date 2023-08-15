import { Request, Response, NextFunction } from "express";
import { Users } from "../model/users";

const isStrongPassword = (password: string) => {
  const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  const numberRegex = /\d/;
  return (
    password.length >= 6 &&
    specialCharRegex.test(password) &&
    numberRegex.test(password)
  );
};

export const validateStrongPassword = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const password = req.body.password;

  if (!password || !isStrongPassword(password)) {
    return res.status(400).send({
      error:
        "Password is not strong enough. Must contain at list 6 characters, one special and one number",
    });
  }

  next();
};

export const validateUsername = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;

  if (!username || username.length < 4 || Users.has(username)) {
    return res.status(400).send({
      error: "Username is not valid. Must be at list 4 characters",
    });
  }

  next();
};
