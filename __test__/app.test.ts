import request from "supertest";
import app from "../src/app";
import config from "../src/config";

describe("Test app.ts", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(config.PORT);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("Catch-all route", async () => {
    const res = await request(app).get("/");
    expect(res.body).toEqual({ message: "Server is running..." });
  });
});
