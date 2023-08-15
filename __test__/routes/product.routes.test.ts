import request from "supertest";
import app from "../../src/app";
import config from "../../src/config";
import { ProductsInterface } from "../../src/interfaces/products.interface";
import { fetchDataFromFile } from "../../src/utils/file";

describe("Get products", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(config.PORT);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("Get shoes", async () => {
    const res = await request(app).get("/product/all").query({ q: "shoes" });
    expect(res.body.products).toBeDefined();
    expect(typeof res.body.products).toBe(typeof []);
    expect(res.body.products.length).toBeGreaterThan(0);

    const tempProducts: ProductsInterface =
      fetchDataFromFile("data/products.json");

    expect(tempProducts["shoes"]).toBeDefined();
  });
});
