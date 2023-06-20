import { prisma } from "@/config";

interface SinglePost {
  userId: number;
  description: string;
  country: string;
  picture: string;
}

interface MultiplePost {
  userId: number;
  description: string;
  country: string;
  pictures: string[];
}

async function getPosts() {
  return await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      description: true,
      country: true,
      pictures: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function create(data: SinglePost) {
  try {
    const post = await prisma.posts.create({
      data: {
        userId: data.userId,
        description: data.description,
        country: data.country,
        pictures: {
          create: {
            url: data.picture,
          },
        },
      },
    });

    return post;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function createMultipleImages(data: MultiplePost) {
  return await prisma.posts.create({
    data: {
      userId: data.userId,
      description: data.description,
      country: data.country,
      pictures: {
        create: data.pictures.map((url) => ({ url })),
      },
    },
  });
}

async function getPostById(postId: number) {
  return await prisma.posts.findUnique({
    where: { id: postId },
    select: {
      id: true,
      description: true,
      country: true,
      pictures: true,
      User: { select: { username: true } },
      Comments: {
        select: {
          comment: true,
          user: { select: { username: true } }
        }
      }
    }
  })
}

async function getPostsByUserId(userId: number) {
  return await prisma.posts.findMany({
    where: { userId: userId },
    select: {
      id: true,
      description: true,
      country: true,
      pictures: {
        select: {
          url: true,
        },
      },
      User: {
        select: {
          username: true,
          id: true,
        },
      },
    },
  });
}

async function updatePost(postId: number, description: string) {
  return await prisma.posts.update({
    where: { id: postId },
    data: { description: description },
  });
}

async function deletePost(postId: number) {
  await prisma.posts.delete({
    where: {
      id: postId,
    },
  });
}

const postsRepository = {
  getPosts,
  create,
  createMultipleImages,
  getPostById,
  getPostsByUserId,
  updatePost,
  deletePost,
};

export default postsRepository;
