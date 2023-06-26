import { NextFunction, Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import commentsService from "@/services/comments-service";

export async function postComment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { postId, comment } = req.body as {
    postId: number;
    comment: string;
  };

  const { userId } = req as { userId: number };

  try {
    const commentData = await commentsService.createComment({
      comment,
      postId,
      userId,
    });
    return res.status(httpStatus.CREATED).send(commentData);
  } catch (error) {
    next(error);
  }
}

export async function updateComment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { commentId, updatedComment } = req.body as {
    commentId: number;
    updatedComment: string;
  };

  const { userId } = req as { userId: number };

  try {
    const comment = await commentsService.updateComment({
      commentId,
      updatedComment,
      userId,
    });

    return res.status(httpStatus.NO_CONTENT).send(comment);
  } catch (error) {
    next(error);
  }
}

export async function deleteComment(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const { postId, commentId } = req.body as {
    postId: number;
    commentId: number;
  };

  const { userId } = req as { userId: number };

  try {
    const comment = await commentsService.deleteComment({
      commentId,
      postId,
      userId
    });
    return res.status(httpStatus.NO_CONTENT).send(comment);
  } catch (error) {
    next(error);
  }
}
