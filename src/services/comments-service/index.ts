import { forBiddenError, notFoundError } from "@/errors";
import postsRepository from "@/repositories/posts-repository";
import { CreateCommentParams, DeleteCommentParams, UpdateCommentParams } from "@/utils/protocols";
import commentsRepository from "@/repositories/comments-repository";

async function verifyCommentOwnership(commentId: number, userId: number) {
  const comment = await commentsRepository.getCommentById(commentId);
  if (!comment) throw notFoundError();

  if (comment.userId !== userId) throw forBiddenError();

  return comment;
}

async function createComment({ userId, postId, comment }: CreateCommentParams) {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError();

  const commentData = await commentsRepository.createComment({
    userId,
    postId,
    comment,
  });

  return commentData;
}

async function updateComment({
  commentId,
  userId,
  updatedComment
}: UpdateCommentParams) {
  const post = await commentsRepository.getCommentById(commentId);
  if (!post) throw notFoundError();

  await verifyCommentOwnership(commentId, userId);

  const updatedPost = await commentsRepository.updateComment({commentId, userId, updatedComment});

  return updatedPost;
}

async function deleteComment({
  commentId,
  postId,
  userId,
}: DeleteCommentParams): Promise<void> {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError();

  await verifyCommentOwnership(commentId, userId);

  await commentsRepository.deleteComment(commentId);
}

const commentsService = {
  createComment,
  updateComment,
  deleteComment,
};

export default commentsService;
