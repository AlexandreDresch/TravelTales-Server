import { Router } from "express";

import { createPostSchema } from "@/schemas";
import { validateBody, authenticateToken } from "@/middlewares";
import { postsPost, getPosts } from "@/controllers";

const postsRouter = Router();

postsRouter
  .get("/", getPosts)
  .all("*", authenticateToken)
  .post("/", validateBody(createPostSchema), postsPost);

export { postsRouter };
