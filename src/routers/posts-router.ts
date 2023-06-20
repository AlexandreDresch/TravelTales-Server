import { Router } from "express";

import { createPostSchema, deletePostSchema, updatePostSchema } from "@/schemas";
import { validateBody, authenticateToken } from "@/middlewares";
import { postsPost, getPosts, updatePost, deletePost, getPostById, getPostsByUserId } from "@/controllers";

const postsRouter = Router();

postsRouter
  .get("/", getPosts)
  .get("/:id", getPostById)
  .all("*", authenticateToken)
  .get("/user/:id", getPostsByUserId)
  .post("/", validateBody(createPostSchema), postsPost)
  .put("/", validateBody(updatePostSchema), updatePost)
  .delete("/", validateBody(deletePostSchema), deletePost);

export { postsRouter };
