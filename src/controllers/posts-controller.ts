import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import postService from "@/services/posts-service";
import { AuthenticatedRequest } from "@/middlewares";

export async function getPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const posts = await postService.getPosts();
    return res.status(httpStatus.OK).send(posts);
  } catch (error) {
    next(error);
  }
}

export async function postsPost(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { files, description, country } = req.body;
  const { userId } = req as { userId: number };

  try {
    const post = await postService.createPost({
      files,
      description,
      country,
      userId,
    });
    return res.status(httpStatus.CREATED).send(post);
  } catch (error) {
    next(error);
  }
}
