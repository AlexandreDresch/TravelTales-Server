import { User } from "@prisma/client";
import { forBiddenError, notFoundError } from "@/errors";
import postsRepository from "@/repositories/posts-repository";
import {
  CreatePostParams,
  DeletePostParams,
  UpdatePostParams,
} from "@/utils/protocols";
import cloudinaryV2 from "@/utils/cloudinary";

async function verifyPostOwnership(postId: number, userId: number) {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError();

  if (post.User.id !== userId) throw forBiddenError();

  return post;
}

async function getPosts() {
  const posts = await postsRepository.getPosts();

  if (!posts) throw notFoundError();

  return posts;
}

async function getPostById(postId: number) {
  const post = await postsRepository.getPostById(postId);

  if (!post) throw notFoundError();

  return post;
}

async function getPostsByUserId(userId: number) {
  const post = await postsRepository.getPostsByUserId(userId);

  if (!post) throw notFoundError();

  return post;
}

async function createPost({
  files,
  description,
  country,
  userId,
}: CreatePostParams) {
  if (files.length === 1) {
    let uploadedResponse = await cloudinaryV2.uploader.upload(files[0], {
      upload_preset: "dev_setup",
    });
    const post = await postsRepository.create({
      userId,
      description,
      country,
      picture: uploadedResponse.secure_url,
    });

    return post;
  } else {
    const imagesArr: string[] = [];

    for (let i = 0; i < files.length; i++) {
      let uploadedResponse = await cloudinaryV2.uploader.upload(files[i], {
        upload_preset: "dev_setup",
      });
      imagesArr.push(uploadedResponse.secure_url);
    }
    const post = await postsRepository.createMultipleImages({
      userId,
      description,
      country,
      pictures: imagesArr,
    });

    return post;
  }
}

async function updatePost({
  description,
  userId,
  postId,
}: UpdatePostParams) {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError();
  await verifyPostOwnership(postId, userId);

  const updatedPost = await postsRepository.updatePost(postId, description);

  return updatedPost;
}

async function deletePost({ postId, userId }: DeletePostParams): Promise<void> {
  const post = await postsRepository.getPostById(postId);
  if (!post) throw notFoundError();

  await verifyPostOwnership(postId, userId);

  await postsRepository.deletePost(postId);
}

const postsService = {
  createPost,
  getPosts,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};

export default postsService;
