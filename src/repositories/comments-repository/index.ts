import { prisma } from "@/config";
import { CreateCommentParams, UpdateCommentParams } from "@/utils/protocols";

async function getCommentById(commentId: number) {
  return await prisma.comments.findUnique({
    where: { id: commentId },
  });
}

async function createComment(data: CreateCommentParams) {
  try {
    const post = await prisma.comments.create({
      data: {
        userId: data.userId,
        postId: data.postId,
        comment: data.comment,
      },
    });

    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateComment(data: UpdateCommentParams) {
  return await prisma.comments.update({
    where: { id: data.commentId },
    data: { comment: data.updatedComment },
  });
}

async function deleteComment(commentId: number) {
  await prisma.comments.delete({
    where: {
      id: commentId,
    },
  });
}

const commentsRepository = {
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
};

export default commentsRepository;
