import { Router } from "express";

import {
  createPostSchema,
  deletePostSchema,
  getPostByIdSchema,
  getPostByUserIdSchema,
  updatePostSchema,
} from "@/schemas";

import { validateBody, authenticateToken, validateParams } from "@/middlewares";

import {
  postsPost,
  getPosts,
  updatePost,
  deletePost,
  getPostById,
  getPostsByUserId,
} from "@/controllers";

const postsRouter = Router();

postsRouter
  .get("/", getPosts)
  .get("/:postId", validateParams(getPostByIdSchema), getPostById)
  .all("*", authenticateToken)
  .get("/user/:userId", validateParams(getPostByUserIdSchema), getPostsByUserId)
  .post("/", validateBody(createPostSchema), postsPost)
  .put("/", validateBody(updatePostSchema), updatePost)
  .delete("/", validateBody(deletePostSchema), deletePost);

export { postsRouter };
