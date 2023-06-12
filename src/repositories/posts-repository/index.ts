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

const postsRepository = {
  getPosts,
  create,
  createMultipleImages,
};

export default postsRepository;
