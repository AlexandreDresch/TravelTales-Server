import { User } from "@prisma/client";

export interface ApplicationError {
  name: string;
  message: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignInResult {
  user: Pick<User, "id" | "email">;
  token: string;
}

export interface GetUserOrFailResult {
  id: number;
  email: string;
  password: string;
}

export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}
