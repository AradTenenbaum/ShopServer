const axios = require("axios");
const cheerio = require("cheerio");
const { Products } = require("../model/products");
import CONFIG from "../config";
import { ProductInterface } from "../interfaces/product.interface";
import { saveDataToFile } from "../utils/file";
import { isDouble } from "../utils/string";

export async function fetchFromAmazonToProducts(searchQuery: string) {
  // Create the url
  const fixedSearchQuery = searchQuery.toLocaleLowerCase();
  const url = `${CONFIG.AMAZON_URL}${encodeURIComponent(fixedSearchQuery)}`;

  // Get the data from amazon
  const response = await axios.get(url, {
    headers: {
      "User-Agent": "Your User Agent String",
    },
  });
  const $ = cheerio.load(response.data);

  const products: ProductInterface[] = [];

  // Get the needed elements from the response
  $(".s-result-item.s-widget-spacing-small").each(
    (index: number, element: any) => {
      const title = $(element).find(".a-color-base.a-text-normal").text();
      const priceInt = $(element).find(".a-price-whole").text();
      const priceFraction = $(element).find(".a-price-fraction").text();
      const link = $(element).find("h2 a").attr("href");
      const image = $(element).find(".s-image").attr("src");
      const rate = $(element).find(".a-icon-alt").text();

      // Fix the price because I can't predict when there are multiple prices
      let fixedPrice = `${priceInt}${priceFraction}`;
      const dots = fixedPrice.split(".");
      if (dots.length > 2 || !isDouble(fixedPrice)) fixedPrice = "";

      products.push({
        title,
        price: fixedPrice,
        image,
        link: "https://www.amazon.com" + link,
        rate,
      });
    }
  );

  // Update the object and save it to the file
  Products[fixedSearchQuery] = products;
  saveDataToFile("data/products.json", Products);

  return products;
}
