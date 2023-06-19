import { faker } from "@faker-js/faker";
import { prisma } from "@/config";

export async function createPost(userId: number) {
  return prisma.posts.create({
    data: {
        userId: userId,
        description: faker.lorem.sentence(),
        country: faker.location.country(),
        pictures: {
          create: {
            url: faker.image.urlLoremFlickr(),
          },
        },
      },
  });
}
