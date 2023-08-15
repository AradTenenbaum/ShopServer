import { fetchFromAmazonToProducts } from "../../src/services/crawler.service";
import { fetchDataFromFile } from "../../src/utils/file";

describe("Test crawler", () => {
  test("Fetch data from amazon", async () => {
    const products = await fetchFromAmazonToProducts("shoes");
    expect(typeof products).toBe(typeof []);
    expect(products.length).toBeGreaterThan(0);
    const productsFromFile = fetchDataFromFile("data/products.json");
    expect(productsFromFile["shoes"]).toBeDefined();
    expect(productsFromFile["shoes"].length).toBeGreaterThan(0);
  });
});
