import { Router } from "express";

import { createCommentSchema, deleteCommentSchema, updateCommentSchema } from "@/schemas";

import { validateBody, authenticateToken } from "@/middlewares";

import {
 postComment,
 updateComment,
 deleteComment
} from "@/controllers";

const commentsRouter = Router();

commentsRouter
  .all("*", authenticateToken)
  .post("/", validateBody(createCommentSchema), postComment)
  .put("/", validateBody(updateCommentSchema), updateComment)
  .delete("/", validateBody(deleteCommentSchema), deleteComment);

export { commentsRouter };
