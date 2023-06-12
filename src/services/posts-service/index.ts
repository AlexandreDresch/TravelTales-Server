import { User } from "@prisma/client";
import { notFoundError } from "@/errors";
import postsRepository from "@/repositories/posts-repository";
import { CreatePostParams } from "@/utils/protocols";
import cloudinaryV2 from "@/utils/cloudinary";

async function getPosts() {
  const posts = await postsRepository.getPosts();

  if (!posts) throw notFoundError();

  return posts;
}

export async function createPost({
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

const postsService = {
  createPost,
  getPosts,
};

export default postsService;
