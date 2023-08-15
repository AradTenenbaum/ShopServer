import { Request, Response } from "express";
let { Products } = require("../model/products");
import { fetchAmazonData, fetchFromAmazonToProducts } from "./crawler.service";
import { ERROR } from "../utils/constants";
import { fetchDataFromFile } from "../utils/file";
const serverLog = require("../utils/log");

export const getAllProducts = async (req: Request, res: Response) => {
  const searchQuery = <string>req.query.q;
  // Check if the local data currently contains the search
  if (Products[searchQuery])
    return res.status(200).send({ products: Products[searchQuery] });
  else {
    // Check if the json data file contains the search
    Products = fetchDataFromFile("data/products.json");
    if (Products[searchQuery])
      return res.status(200).send({ products: Products[searchQuery] });
    else {
      try {
        // Fetch data from amazon
        const products = await fetchFromAmazonToProducts(searchQuery);
        if (products) return res.status(200).send({ products });
      } catch (error) {
        serverLog(error, ERROR);
        return res.status(400).send("Error in getting products");
      }
    }
  }
};
