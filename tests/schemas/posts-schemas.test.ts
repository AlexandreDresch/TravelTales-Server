import { faker } from "@faker-js/faker";
import { createPostSchema } from "@/schemas";

describe("createPostSchema", () => {
  const generateValidInput = () => ({
    files: [faker.image.urlLoremFlickr()],
    description: faker.lorem.sentence(),
    country: faker.location.country(),
  });

  describe("when files are not valid", () => {
    it("should return error if files is not present", () => {
      const input = generateValidInput();
      delete input.files;

      const { error } = createPostSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  describe("when country is not valid", () => {
    it("should return error if country is not present", () => {
      const input = generateValidInput();
      delete input.country;

      const { error } = createPostSchema.validate(input);

      expect(error).toBeDefined();
    });
  });

  it("should return no error if input is valid", () => {
    const input = generateValidInput();
    console.log(input);

    const { error } = createPostSchema.validate(input);

    expect(error).toBeUndefined();
  });
});
