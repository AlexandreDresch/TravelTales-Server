import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import * as jwt from "jsonwebtoken";
import { createUser } from "../factories/users.factory";
import { cleanDb, generateValidToken } from "../helpers";
import { prisma } from "@/config";
import app, { init } from "@/app";
import { base64Image } from "../utils/base64Image";
import { createPost } from "../factories/posts-factory";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

describe("GET /posts", () => {
  it("should respond with status 200 and with posts array", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    await createPost(user.id);

    const response = await server
      .get("/posts")
      .set("Authorization", `Bearer ${token}`);    

    expect(response.status).toEqual(httpStatus.OK);
    console.log(response.body);
    expect(response.body).toEqual([
      {
        id: expect.any(Number),
        User: {
          username: expect.any(String),
        },
        country: expect.any(String),
        description: expect.any(String),
        pictures: [
          {
            url: expect.any(String)
          }
        ]
      },
    ]);
  });
});

describe("POST /posts", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/posts");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();

    const response = await server
      .post("/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign(
      { userId: userWithoutSession.id },
      process.env.JWT_SECRET
    );

    const response = await server
      .post("/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 400 when body is not given", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const response = await server
      .post("/posts")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const user = await createUser();
    const token = await generateValidToken(user);

    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server
      .post("/posts")
      .set("Authorization", `Bearer ${token}`)
      .send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    const generateValidBody = () => ({
      files: [base64Image],
      description: faker.lorem.sentence(),
      country: faker.location.country(),
    });

    it("should respond with status 201 and create post", async () => {
      const body = generateValidBody();
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        country: expect.any(String),
        createdAt: expect.any(String),
        description: expect.any(String),
        updatedAt: expect.any(String),
        userId: expect.any(Number),
      });
    });

    it("should save post on db", async () => {
      const body = generateValidBody();
      const user = await createUser();
      const token = await generateValidToken(user);

      const response = await server
        .post("/posts")
        .set("Authorization", `Bearer ${token}`)
        .send(body);

      const post = await prisma.posts.findUnique({
        where: { id: response.body.id },
      });
      expect(post).toEqual(
        expect.objectContaining({
          id: response.body.id,
        })
      );
    });
  });
});
