import Joi from "joi";
import { SignInParams } from "@/utils/protocols";

export const signInSchema = Joi.object<SignInParams>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
