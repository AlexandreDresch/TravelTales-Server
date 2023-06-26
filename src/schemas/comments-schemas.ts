import Joi from "joi";
import {
  CreateCommentParams,
  DeleteCommentParams,
  UpdateCommentParams,
} from "@/utils/protocols";

export const createCommentSchema = Joi.object<CreateCommentParams>({
  postId: Joi.number().required(),
  comment: Joi.string().min(1).required(),
});

export const updateCommentSchema = Joi.object<UpdateCommentParams>({
  commentId: Joi.number().required(),
  updatedComment: Joi.string().min(1).required(),
});

export const deleteCommentSchema = Joi.object<DeleteCommentParams>({
    commentId: Joi.number().required(),
    postId: Joi.number().required(),
});

