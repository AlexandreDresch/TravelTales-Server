import Joi from "joi";
import {
  CreatePostParams,
  DeletePostParams,
  UpdatePostParams,
} from "@/utils/protocols";

export const createPostSchema = Joi.object<CreatePostParams>({
  files: Joi.array().items(Joi.string()).required(),
  description: Joi.string(),
  country: Joi.string().required(),
});

export const updatePostSchema = Joi.object<UpdatePostParams>({
  description: Joi.string().required(),
  postId: Joi.number().required(),
});

export const deletePostSchema = Joi.object<DeletePostParams>({
  postId: Joi.number().required(),
});

export const getPostByIdSchema = Joi.object({
  postId: Joi.number().required(),
});

export const getPostByUserIdSchema = Joi.object({
  userId: Joi.number().required(),
});
