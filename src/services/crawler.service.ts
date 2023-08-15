const axios = require("axios");
const cheerio = require("cheerio");
const { Products } = require("../model/products");
const serverLog = require("../utils/log");
import CONFIG from "../config";
import { Product } from "../interfaces/product.interface";
import { Request, Response } from "express";
import { ERROR } from "../utils/constants";
import { saveDataToFile } from "../utils/file";

export async function fetchAmazonData(req: Request, res: Response) {
  const searchQuery = <string>req.query.q;

  if (!searchQuery) return res.status(400).send("Insert search query");
  // TODO: handle language change, or pages
  try {
    // TODO: catch axios error normally
    await fetchFromAmazonToProducts(searchQuery);

    return res.status(200).send("Success");
  } catch (error) {
    serverLog(error, ERROR);
    return res.status(400).send("Error in loading data");
  }
}

export async function fetchFromAmazonToProducts(searchQuery: string) {
  const fixedSearchQuery = searchQuery.toLocaleLowerCase();
  const url = `${CONFIG.AMAZON_URL}${encodeURIComponent(fixedSearchQuery)}`;
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Your User Agent String",
    },
  });
  const $ = cheerio.load(response.data);

  const products: Product[] = [];

  $(".s-result-item.s-widget-spacing-small").each(
    (index: number, element: any) => {
      const title = $(element).find(".a-color-base.a-text-normal").text();
      const priceInt = $(element).find(".a-price-whole").text();
      const priceFraction = $(element).find(".a-price-fraction").text();
      const link = $(element).find("h2 a").attr("href");
      const image = $(element).find(".s-image").attr("src");
      const rate = $(element).find(".a-icon-alt").text();

      products.push({
        title,
        price: `${priceInt}${priceFraction}`,
        image,
        link: "https://www.amazon.com" + link,
        rate,
      });
    }
  );

  Products[fixedSearchQuery] = products;
  saveDataToFile("data/products.json", Products);

  return products;
}
