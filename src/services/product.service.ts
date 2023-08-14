import { Request, Response } from "express";
let { Products } = require("../model/products");
import {
  fetchAmazonData,
  fetchFromAmazonToProducts,
  fetchObjectFromFile,
} from "./crawler.service";
import { ERROR } from "../utils/constants";
const serverLog = require("../utils/log");

export const getAllProducts = async (req: Request, res: Response) => {
  const searchQuery = <string>req.query.q;
  if (Products[searchQuery])
    return res.status(200).send({ products: Products[searchQuery] });
  else {
    Products = fetchObjectFromFile("data/products.json");
    if (Products[searchQuery])
      return res.status(200).send({ products: Products[searchQuery] });
    else {
      try {
        const products = await fetchFromAmazonToProducts(searchQuery);
        if (products) return res.status(200).send({ products });
      } catch (error) {
        serverLog(error, ERROR);
      }
    }
  }
};
