import Joi from "joi";
import { CreateUserParams } from "@/utils/protocols";

export const createUserSchema = Joi.object<CreateUserParams>({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
