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

export async function getPostById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = req.params;

  try {
    const post = await postService.getPostById(+postId);
    return res.status(httpStatus.OK).send(post);
  } catch (error) {
    next(error);
  }
}

export async function getPostsByUserId(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;

  try {
    const post = await postService.getPostsByUserId(+userId);
    return res.status(httpStatus.OK).send(post);
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

export async function updatePost(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { description, postId } = req.body as {
    description: string;
    postId: number;
  };

  const { userId } = req as { userId: number };

  try {
    const post = await postService.updatePost({
      description,
      userId,
      postId,
    });

    return res.status(httpStatus.NO_CONTENT).send(post);
  } catch (error) {
    next(error);
  }
}

export async function deletePost(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const  postId  = +req.params.postId;
  const { userId } = req as { userId: number };

  try {
    const post = await postService.deletePost({
      postId,
      userId,
    });

    return res.status(httpStatus.NO_CONTENT).send(post);
  } catch (error) {
    next(error);
  }
}
