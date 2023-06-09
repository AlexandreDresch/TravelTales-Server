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

export interface CreatePostParams {
  files: string[];
  description?: string;
  country: string;
  userId: number;
}

export interface UpdatePostParams {
  description: string;
  userId: number;
  postId: number;
}

export interface DeletePostParams {
  userId: number;
  postId: number;
}

export interface CreateCommentParams {
  userId: number;
  postId: number;
  comment: string;
}

export interface UpdateCommentParams {
  commentId: number;
  userId?: number;
  updatedComment: string;
}

export interface DeleteCommentParams {
  commentId: number;
  userId?: number;
  postId?: number;
}