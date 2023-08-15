import request from "supertest";
import app from "../../src/app";
import config from "../../src/config";
import { Users } from "../../src/model/users";
import jwt, { Secret } from "jsonwebtoken";

function createUser(username: string, password: string) {
  if (!Users.has(username)) {
    Users.set(username, {
      id: 1,
      username,
      password,
      favoriteCategories: new Set<string>([]),
    });
  }
}

function getLoginToken(username: string) {
  const token = jwt.sign({ username }, config.JWT_KEY as Secret, {
    expiresIn: "1h",
  });
  return token;
}

describe("User tests", () => {
  let server: any;

  beforeAll(() => {
    server = app.listen(config.PORT);
  });

  afterAll((done) => {
    server.close(done);
  });

  test("Register user success", async () => {
    const res = await request(app)
      .post("/user/register")
      .send({ username: "Testing", password: "testing1!" });
    expect(res.body.error).toBeUndefined();
    expect(res.statusCode).toBe(200);
  });

  test("Register user failed - password no special character", async () => {
    const res = await request(app)
      .post("/user/register")
      .send({ username: "Testing", password: "testing1" });
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  test("Register user failed - password no number", async () => {
    const res = await request(app)
      .post("/user/register")
      .send({ username: "Testing", password: "testing!" });
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  test("Register user failed - username", async () => {
    const res = await request(app)
      .post("/user/register")
      .send({ username: "aa", password: "testing!123" });
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  test("Login user success", async () => {
    createUser("Testing", "testing1!");
    const res = await request(app)
      .post("/user/login")
      .send({ username: "Testing", password: "testing1!" });
    expect(res.body.error).toBeUndefined();
    expect(res.body.token).toBeDefined();
    expect(res.statusCode).toBe(200);
  });

  test("Login user failed - wrong username", async () => {
    const res = await request(app)
      .post("/user/login")
      .send({ username: "abcabc", password: "testing!123" });
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  test("Login user failed - wrong password", async () => {
    const res = await request(app)
      .post("/user/register")
      .send({ username: "Testing", password: "aabbcc1!" });
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });

  test("Add category to favorites - success", async () => {
    createUser("Testing", "testing1!");
    const token = getLoginToken("Testing");
    const res = await request(app)
      .post("/user/add-favorite")
      .set("Authorization", `Bearer ${token}`)
      .send({ category: "shoes" });
    expect(res.body.error).toBeUndefined();
    expect(res.statusCode).toBe(200);
  });

  test("Add category to favorites - auth fail", async () => {
    const res = await request(app)
      .post("/user/add-favorite")
      .send({ category: "shoes" });
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(401);
  });

  test("Add category to favorites - invalid category fail", async () => {
    createUser("Testing", "testing1!");
    const token = getLoginToken("Testing");
    const res = await request(app)
      .post("/user/add-favorite")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(res.body.error).toBeDefined();
    expect(res.statusCode).toBe(400);
  });
});
