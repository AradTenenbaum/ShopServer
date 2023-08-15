import { Request, Response } from "express";
import { Users } from "../model/users";
import jwt, { Secret } from "jsonwebtoken";
import config from "../config";
import { ERROR } from "../utils/constants";
const serverLog = require("../utils/log");

let id = 1;

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    Users.set(username, {
      id,
      username,
      password,
      favoriteCategories: new Set<string>([]),
    });
    id++;
  } catch (error) {
    serverLog(error, ERROR);
    return res.status(500).send({ error: "Something went wrong" });
  }
  return res.status(200).send({ message: "Successfully registered" });
};

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .send({ error: "Invalid details, please enter username and password" });
  if (Users.has(username)) {
    if (Users.get(username)?.password === password) {
      const token = jwt.sign({ username }, config.JWT_KEY as Secret, {
        expiresIn: "1h",
      });
      return res.status(200).send({ message: "Successfully logged in", token });
    } else {
      return res.status(400).send({ error: "Wrong credentials" });
    }
  }
  return res.status(400).send({ error: "Wrong credentials" });
};

export const addFavoriteCategory = (req: Request, res: Response) => {
  const username = req.username;
  const { category } = req.body;
  try {
    if (!category || category === "") {
      return res.status(400).send({ error: "Category is not valid" });
    }
    if (username)
      Users.get(username)?.favoriteCategories.add(
        req.body.category.toLowerCase()
      );
    return res
      .status(200)
      .send({ message: "Category was added to user's favorites" });
  } catch (error) {
    serverLog(error, ERROR);
    return res.status(500).send({ error: "Something went wrong" });
  }
};
