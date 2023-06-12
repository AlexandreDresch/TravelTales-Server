import Joi from "joi";
import { CreatePostParams } from "@/utils/protocols";

export const createPostSchema = Joi.object<CreatePostParams>({
  files: Joi.array().items(Joi.string()),
  description: Joi.string(),
  country: Joi.string().required(),
});
